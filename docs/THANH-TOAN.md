# Thanh toán Premium

Bàn Toán giữ toàn bộ tờ toán mở. Trang **Nâng cấp Premium** bán một quyền dùng gắn với email và một mã kích hoạt. Giá, số tài khoản và chữ ký chỉ nằm trên server. Trình duyệt không được gửi số tiền.

Có bốn cách trả:

1. **Ví MoMo** — `requestType=captureWallet`. Người học mở `payUrl` hoặc deeplink. Quyền chỉ bật khi IPN hợp lệ.
2. **Quét QR** — `requestType=payWithMethod`. Sandbox trả `payUrl` và, với `captureWallet`, một `qrCodeUrl` dạng `momo://`. Trang vẽ mã QR từ chuỗi đó để app MoMo quét, không nhúng ảnh từ máy MoMo. Kèm một **VietQR** (EMVCo/NAPAS, CRC-16/CCITT-FALSE) chuyển thẳng vào tài khoản cấu hình.
3. **Chuyển khoản ngân hàng** — hiện số tài khoản, tên, ngân hàng, số tiền và nội dung `BTxxxxxxxx` riêng của đơn, có nút chép. Cùng chuỗi VietQR. Thêm link `payWithATM` nếu MoMo tạo được, để ATM xác nhận qua IPN. Đơn chờ hết hạn sau 15 phút. Phản hồi sandbox hiện không kèm `signature`; chữ ký phản hồi được kiểm khi MoMo có gửi, chữ ký IPN thì luôn bắt buộc.
4. **Tiền mã hóa** — USDT TRC20 trên TRON, USDT và USDC BEP20 trên BSC, USDC SPL trên Solana. Người học chuyển thẳng vào ví của chủ app. Không có bên thứ ba giữ tiền, và server không bao giờ cần khóa riêng.

## Vì sao email và mã kích hoạt

Chưa có tài khoản mật khẩu. Email chỉ để ghi đơn. Sau khi tiền khớp, server tạo mã `bt_…` (24 byte ngẫu nhiên), lưu **SHA-256**, và trả mã một lần cho người giữ `orderId`. Máy học lưu mã trong `localStorage` khóa `ban-toan-license`. Kiểm tra quyền gửi mã lên `/api/premium/status?license=`. Không có mật khẩu để lộ, và mã không nằm trong kho toán `ban-toan`.

File SQLite vẫn chứa mã thô để trang trạng thái trả lại cho người vừa trả. Ai đọc được file đó đọc được mã. Khi chuyển Postgres/KV, hạn chế quyền đọc bảng `orders`.

## Kiến trúc

```
src/premium/Upgrade.tsx     trang /nang-cap, tải lười, không nhập vào các tờ toán
server/pay/                 chữ ký MoMo, VietQR, crypto, đơn, SQLite
api/premium/*.ts            hàm Vercel, mỗi đường một file
```

| Đường | Việc |
| --- | --- |
| `GET /api/premium/plans` | Giá tháng/năm do server đọc từ biến môi trường |
| `POST /api/premium/create` | Tạo đơn. Bỏ qua mọi số tiền client gửi |
| `POST /api/premium/ipn` | IPN MoMo. Sai chữ ký thì 401. `resultCode` khác 0 thì không cấp quyền. Số tiền lệch thì 400. Đơn đã trả thì `applied: false` |
| `GET /api/premium/return` | Trình duyệt MoMo quay về. Chỉ chuyển sang `/nang-cap?orderId=`, không cấp quyền |
| `GET /api/premium/status` | Theo `orderId` hoặc `license` |
| `POST /api/premium/bank` | Webhook biến động số dư. Khớp nội dung CK và số tiền, idempotent theo mã giao dịch |
| `POST /api/premium/confirm` | Duyệt tay mọi cách trả, kể cả crypto. Header `Authorization: Bearer ADMIN_TOKEN` |
| `POST /api/premium/refund` | Admin ghi nhận đã hoàn tiền: đơn thành `refunded`, mã Premium ngừng chạy, hoa hồng chưa chi bị hủy. Header `Authorization: Bearer ADMIN_TOKEN` |
| `POST /api/premium/affiliate` | Mã giới thiệu, đếm lượt, xem thống kê của chính mình |
| `POST /api/premium/affiliate-admin` | Admin xem danh sách và duyệt chi. Không chuyển tiền |
| `POST /api/premium/crypto` | Đổi mạng khi đơn còn chờ, dán mã giao dịch để đối soát on-chain, hoặc `{ "watch": true }` để worker rà các đơn đã có mã |

Chữ ký tạo đơn, đúng thứ tự tài liệu captureWallet:

`accessKey, amount, extraData, ipnUrl, orderId, orderInfo, partnerCode, redirectUrl, requestId, requestType`

Chữ ký IPN:

`accessKey, amount, extraData, message, orderId, orderInfo, orderType, partnerCode, payType, requestId, responseTime, resultCode, transId`

`accessKey` không có trong body IPN. Server tự ghép từ biến môi trường.

VietQR: tag `38` chứa GUID `A000000727`, BIN, số tài khoản và dịch vụ `QRIBFTTA`. Tag `63` là CRC-16/CCITT-FALSE trên cả chuỗi kể cả `6304`. Giá trị kiểm của thuật toán với `123456789` là `29B1`.

Premium mở: đề thi thử chuẩn THPT 2025 không giới hạn ở `/thi-thu` (đề đầu tiên miễn phí), bảng điểm theo phần và chủ đề, trợ lý 40 câu mỗi ngày tính theo mã, ba chế độ Premium của trợ lý (lời giải đầy đủ, kiểm tra bài làm, ảnh đề bài; xem `docs/TRO-LY.md`), kế hoạch ôn lỗi sai ở `/on-loi-sai`, và nhập mã trên máy khác ở `/nang-cap`. Trình duyệt kiểm mã qua `/api/premium/status?license=` mỗi lần mở trang (`src/premium/license.ts`) và nhớ kết quả tới hết hạn để dùng khi mất mạng. Kế hoạch ôn lỗi sai (`src/thpt/review.ts`, khóa `ban-toan-review-v1`): khi nộp một đề, câu trắc nghiệm và trả lời ngắn làm sai vào kế hoạch, quay lại sau 1, 3, 7, 14 ngày; sai thì về hộp đầu, đúng ở hộp cuối thì rời kế hoạch. Câu sai được ghi cho mọi người, ôn thì cần Premium. Chính sách và điều kiện hoàn tiền ở `/chinh-sach` (`REFUND_DAYS` trong `src/premium/terms.ts`, email liên hệ qua `VITE_SUPPORT_EMAIL`).

Khi chạy production (`VERCEL_ENV=production`, `NODE_ENV=production` hoặc `PAY_LIVE=1`), server không nhận IPN MoMo và không tạo đơn ví/QR nếu chỉ có khóa sandbox, và bỏ qua `ADMIN_TOKEN` / `BANK_WEBHOOK_SECRET` mẫu hoặc ngắn hơn 16 ký tự. Chuyển khoản đã xác nhận (webhook, IPN, admin) đến sau khi đơn hết 15 phút vẫn được cấp quyền; crypto giữ hạn chặt vì tỷ giá đã khóa.

Cờ `PREMIUM_LOCK` / `VITE_PREMIUM_LOCK` mặc định tắt. Không tờ nào đọc cờ này để giấu bài. Bật `1` chỉ để một lớp sau này khóa phần mới, không đụng công thức hay câu hỏi đã có.

## Kho dữ liệu

Có hai kho, cùng giao diện `PayStore` (`server/pay/store.ts`), chọn theo biến môi trường:

| Biến | Kho | Dùng khi |
| --- | --- | --- |
| `DATABASE_URL` (hoặc `POSTGRES_URL`) có giá trị | Postgres (`server/pay/pgStore.ts`) | Production, và mọi chỗ có nhiều instance |
| Không có | SQLite qua `node:sqlite`, tệp `PREMIUM_DB_PATH` (mặc định `data/premium.sqlite`) | Chạy local, không cần cài gì |

Đừng dùng SQLite trên Vercel: đĩa chỉ ghi được ở `/tmp`, mất khi instance tắt, và IPN với trang trả về có thể rơi vào hai instance khác nhau.

### Postgres

- Lược đồ nằm ở `server/db/schema.ts`, đánh số phiên bản. Lần đầu một instance chạm tới cơ sở dữ liệu, nó áp các phiên bản còn thiếu trong một transaction dưới advisory lock, nên nhiều instance khởi động cùng lúc không đua nhau. Muốn áp trước khi deploy thì chạy `npm run db:migrate`. Thêm thay đổi lược đồ bằng một phiên bản mới ở cuối `MIGRATIONS`, không sửa phiên bản cũ.
- `markPaid` khóa dòng đơn (`SELECT … FOR UPDATE`), ghi `payment_events` với `ON CONFLICT DO NOTHING`, nên hai webhook cùng lúc chỉ cấp một mã và hoa hồng chỉ ghi một lần.
- Số token của đơn tiền mã hóa có chỉ mục `UNIQUE`; hai đơn tạo cùng lúc mà trùng số thì đơn sau được báo giá lại.
- Bộ đếm lượt hỏi trợ lý (`chat_hits`) cũng nằm ở Postgres khi có `DATABASE_URL`, nên mọi instance đếm chung. Không có Postgres thì mỗi instance đếm riêng trong bộ nhớ.
- Thời gian lưu dạng mili giây (`BIGINT`), tiền lưu bằng đồng (`BIGINT`).
- Kích thước pool mỗi instance: `PG_POOL_MAX` (mặc định 3). Trên serverless, dùng chuỗi kết nối qua pooler: Supabase dùng cổng 6543 (transaction mode), Neon dùng host `-pooler`.

Lệnh:

```bash
npm run db:migrate                               # áp lược đồ còn thiếu
npm run db:status                                # phiên bản đã áp, số dòng mỗi bảng
npm run db:copy-sqlite -- data/premium.sqlite    # chép đơn, sự kiện, giới thiệu từ SQLite cũ
```

Các lệnh đọc `DATABASE_URL` từ shell hoặc `.env`. `db:copy-sqlite` chạy lại an toàn: dòng đã có thì bỏ qua, mã kích hoạt cũ vẫn dùng được.

Chạy local trên Postgres: đặt `DATABASE_URL=postgres://…` trong `.env` rồi `npm run dev`. Bỏ dòng đó thì quay về SQLite.

### Test

`npm run test:server` chạy bộ test thanh toán trên SQLite, rồi chạy lại đúng các kịch bản đó trên Postgres thật bằng PGlite (Postgres biên dịch ra WASM, chạy trong tiến trình, không cần máy chủ). Để chạy trên máy chủ Postgres qua driver `pg` như production:

```bash
PAY_TEST_STORE=postgres TEST_DATABASE_URL=postgres://user:pass@127.0.0.1:5432/db npm run test:postgres
```

Mỗi lần chạy dùng một schema riêng rồi xóa đi. CI có một job làm đúng việc này với dịch vụ `postgres:16`.

## Tiền mã hóa

Bốn lựa chọn, hợp đồng mainnet gắn trong mã, không đọc từ biến môi trường để khỏi trỏ nhầm token:

| Mã | Mạng | Token | Thập phân | Hợp đồng |
| --- | --- | --- | --- | --- |
| `tron-usdt` | TRON | USDT | 6 | `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t` |
| `bsc-usdt` | BSC, chain id 56 | USDT | 18 | `0x55d398326f99059fF775485246999027B3197955` |
| `bsc-usdc` | BSC, chain id 56 | USDC | 18 | `0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d` |
| `sol-usdc` | Solana | USDC | 6 | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` |

USDT và USDC trên BSC là bản Binance-Peg, 18 số lẻ, không phải 6. Số hiển thị vẫn có 6 số sau dấu phẩy. Phần nguyên và hai số xu lấy từ giá VND chia tỷ giá. Bốn số còn lại là hậu tố `1…9999` riêng từng đơn, để hai đơn cùng giá không trùng số token. Hậu tố đã dùng không được cấp lại.

Tỷ giá là số nguyên đồng cho 1 USD. `CRYPTO_VND_PER_USD` mặc định `25000`. Nếu `CRYPTO_RATE_URL` có giá trị (mặc định Frankfurter `USD→VND`), server thử tỷ giá công khai và làm tròn. Lỗi mạng, JSON lạ, hoặc tỷ giá ngoài khoảng 1.000–1.000.000 thì dùng mức cấu hình. Đơn giữ tỷ giá lúc tạo trong 15 phút, không đổi khi thị trường chạy.

Mã QR:

- BSC: EIP-681 `ethereum:<hợp-đồng>@56/transfer?address=<ví>&uint256=<đơn-vị-nhỏ-nhất>`.
- Solana: Solana Pay `solana:<ví>?amount=<số>&spl-token=<mint>`.
- TRON: `tron:<ví>?amount=<số>&token=USDT&contract=<hợp-đồng>`. Một số ví chỉ đọc địa chỉ, nên trang luôn có nút chép số token.

Xác nhận đọc RPC/API công khai, không ký gì:

- BSC: `eth_chainId`, `eth_getTransactionReceipt`, `eth_blockNumber`. Đủ log `Transfer` đúng hợp đồng, đúng ví nhận, đúng số, biên lai `0x1`, và đủ số khối (`CRYPTO_BSC_CONFIRMATIONS`, mặc định 15).
- TRON: `wallet/gettransactioninfobyid`, `wallet/gettransactionbyid`, `wallet/getnowblock` trên `CRYPTO_TRON_API` (mặc định TronGrid). Mặc định 19 khối.
- Solana: `getTransaction` và `getSignatureStatuses`. Mặc định chỉ nhận `finalized`. Đặt `CRYPTO_SOL_REQUIRE_FINALIZED=0` thì nhận khi đủ `CRYPTO_SOL_CONFIRMATIONS` (mặc định 32) hoặc đã finalized. Số USDC lấy từ chênh lệch số dư token của đúng ví và đúng mint.

`payment_events` khóa `(crypto, tx hash)`. Gửi lại cùng mã cho cùng đơn thì `applied: false`. Cùng mã cho đơn khác thì 409 `reuse`. Đơn hết 15 phút thì không đối soát và không duyệt tay. Trang tự hỏi lại mỗi 5 giây sau khi đã dán mã. Worker:

```bash
curl -s -X POST http://127.0.0.1:43123/api/premium/crypto \
  -H 'content-type: application/json' \
  -H 'authorization: Bearer doi-token-admin' \
  -d '{"watch":true}'
```

Dán mã bằng tay: `{"orderId":"BT...","txHash":"..."}`. Đổi mạng khi chưa có mã: `{"orderId":"BT...","chain":"sol-usdc"}`. Duyệt tay vẫn là `POST /api/premium/confirm` với `ADMIN_TOKEN`.

Ví nhận trong `.env.example` là địa chỉ **MẪU**. Trang hiện dòng cảnh báo. Đừng gửi tài sản thật vào đó. Đổi `CRYPTO_TRON_ADDRESS`, `CRYPTO_BSC_ADDRESS`, `CRYPTO_SOL_ADDRESS` thành ví bạn giữ khóa, trên máy deploy, không commit. Khóa riêng không có chỗ nào trong server: app chỉ cần địa chỉ để so sánh giao dịch người khác đã ký.

Rủi ro:

- Sai mạng hoặc sai loại token (USDT TRC20 gửi lên BSC, USDT gửi vào đơn USDC) thì log không khớp, đơn không bật, và tiền có thể không lấy lại được.
- Tỷ giá khóa lúc tạo đơn. USDT/USDC lệch neo USD, hoặc VND chạy trong 15 phút, thì số token đã hiện không đổi theo.
- RPC công khai có thể chậm hoặc giới hạn tần suất. Hãy trỏ `CRYPTO_BSC_RPC`, `CRYPTO_TRON_API`, `CRYPTO_SOL_RPC` tới nút của bạn trước khi nhận tiền thật. Chưa đủ xác nhận thì đơn vẫn chờ, không cấp quyền sớm.
- Worker và trang chỉ tin giao dịch đã có trên mạng. Chúng không phát hiện chuyển khoản nếu người học không dán mã và không có tiến trình gọi `watch`.

## Chạy local

```bash
cp .env.example .env
npm install
npm test
npm run dev
```

Mở [http://127.0.0.1:43123/nang-cap](http://127.0.0.1:43123/nang-cap). Vite gắn `/api/premium` ngay trên cổng 43123 (và trên cổng 43991 khi `npm run preview`). Plugin nạp `.env` cho server, nên `ADMIN_TOKEN` và `BANK_WEBHOOK_SECRET` chép từ `.env.example` là giá trị mà hai lệnh `curl` dưới đây dùng. Biến đặt trong shell thắng `.env`. Không cần khóa MoMo riêng: thiếu biến thì server dùng bộ sandbox công khai trong `.env.example`.

Đơn ví và QR gọi MoMo. Đơn chuyển khoản không gọi MoMo. Webhook thử:

```bash
curl -s -X POST http://127.0.0.1:43123/api/premium/bank \
  -H 'content-type: application/json' \
  -H 'x-bank-secret: doi-bi-mat-webhook' \
  -d '{"content":"BT1234ABCD","amount":49000,"transactionId":"tx-1"}'
```

`content` phải chứa đúng mã hiện trên đơn. Casso gửi mảng `data[]` với `description`, `amount`, `id`. SePay gửi `content`, `transferAmount`, `id` và header `Authorization: Apikey <BANK_WEBHOOK_SECRET>`.

Duyệt tay:

```bash
curl -s -X POST http://127.0.0.1:43123/api/premium/confirm \
  -H 'content-type: application/json' \
  -H 'authorization: Bearer doi-token-admin' \
  -d '{"orderId":"BT..."}'
```

## Giới thiệu bạn bè

Mỗi trình duyệt giữ một bí mật cục bộ (`ban-toan-aff-owner`). Server chỉ lưu SHA-256 của bí mật đó, rồi cấp mã 8 ký tự. Link có dạng `/?ref=MA`. Khi khách mở link, mã được giữ trên máy họ và gắn vào đơn Premium lúc tạo — MoMo, VietQR, chuyển khoản và crypto đều đi qua `POST /api/premium/create`.

Hoa hồng là `AFFILIATE_RATE_BPS` phần vạn (mặc định `1000`, tức 10%) của số tiền server đã chốt. Chỉ ghi khi `markPaid` áp dụng lần đầu. Đơn chờ hoặc hết hạn không có hoa hồng. Một đơn chỉ một dòng hoa hồng.

Không tính khi người mua gửi đúng bí mật của chủ mã, hoặc email đơn trùng email đã gắn với mã. Lượt khách trùng một mã máy không đếm hai lần. Chủ mã mở link của mình thì trang xóa ref đã lưu.

Trạng thái hoa hồng: `accrued` (tạm tính, đơn đã trả) và `approved` (admin đã duyệt chi). Duyệt bằng:

```bash
curl -X POST "$PUBLIC_BASE_URL/api/premium/affiliate-admin" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "content-type: application/json" \
  -d '{"action":"approve","code":"MA"}'
```

`{"action":"list"}` xem mọi mã. Phản hồi duyệt có `transferred: false`. Không có lệnh chuyển khoản.

## Lấy khóa MoMo doanh nghiệp

1. Đăng ký đối tác tại [https://business.momo.vn/](https://business.momo.vn/).
2. Tích hợp trên sandbox `https://test-payment.momo.vn` trước. Bộ `partnerCode=MOMO`, `accessKey=F8BBA842ECF85`, `secretKey=K951B6PE1waDMi640xX08PD3vg6EkVlz` là khóa **test công khai**, không nhận tiền thật.
3. Khai báo `ipnUrl` và `redirectUrl` là URL HTTPS công khai. MoMo không gọi được `127.0.0.1`. Dùng một tunnel khi thử IPN trên máy.
4. Sau UAT, MoMo cấp `partnerCode`, `accessKey`, `secretKey` production. Đặt vào biến môi trường của host, không commit, không đưa vào `VITE_`.
5. Endpoint production là `https://payment.momo.vn/v2/gateway/api/create`.

## Deploy

Repo đã có `vercel.json`: build `npm run build`, thư mục `dist`, rewrite SPA trừ `/api/`. Mỗi file trong `api/premium/` là một hàm Node. Chọn Node 22 trở lên cho dự án (`engines` trong `package.json` là `>=22.13`), vì kho đơn dùng `node:sqlite`.

Lỗi trong hàm trả JSON 500 không kèm chi tiết. Log của hàm có dòng `[pay] <method> <đường> <x-request-id>`; mã đó cũng nằm trong header `x-request-id` của phản hồi, nên có thể dò từ trình duyệt tới log.

Đặt biến: `MOMO_*`, `PREMIUM_PRICE_*`, `PUBLIC_BASE_URL` (không dấu `/` cuối), `BANK_*`, `BANK_WEBHOOK_SECRET`, `ADMIN_TOKEN`, `AFFILIATE_RATE_BPS`, `CRYPTO_*`, và `DATABASE_URL` trỏ tới Postgres (Vercel Postgres/Neon tự đặt `POSTGRES_URL`, cũng dùng được). `PUBLIC_BASE_URL` phải là origin mà MoMo và trình duyệt cùng thấy. Không đặt khóa riêng của ví.

Service worker không nuốt `/api/` (`navigateFallbackDenylist`).

## Checklist trước khi nhận tiền thật

- [ ] Đã đổi `MOMO_SECRET_KEY` sang khóa production, không còn khóa sandbox.
- [ ] `MOMO_ENDPOINT` là `https://payment.momo.vn/v2/gateway/api/create`.
- [ ] `PUBLIC_BASE_URL` là HTTPS đúng domain.
- [ ] `BANK_ACCOUNT_NO` không còn `0000000000`, tên không còn `NGUOI DUNG MAU`. Trang phải hết dòng cảnh báo «MẪU».
- [ ] `PREMIUM_PRICE_MONTH` và `PREMIUM_PRICE_YEAR` là giá thật, số nguyên đồng, từ 1.000 đến 50.000.000.
- [ ] `CRYPTO_TRON_ADDRESS`, `CRYPTO_BSC_ADDRESS`, `CRYPTO_SOL_ADDRESS` không còn địa chỉ MẪU. Trang hết dòng «MẪU» ở mạng đang bán.
- [ ] `CRYPTO_BSC_RPC`, `CRYPTO_TRON_API`, `CRYPTO_SOL_RPC` là nút của bạn, không phải RPC công khai mặc định, nếu bạn nhận nhiều đơn.
- [ ] `CRYPTO_VND_PER_USD` là mức dự phòng bạn chấp nhận khi tỷ giá công khai hỏng.
- [ ] `ADMIN_TOKEN` và `BANK_WEBHOOK_SECRET` dài, ngẫu nhiên, không dùng giá trị trong `.env.example`.
- [ ] Đã đặt `DATABASE_URL` (hoặc `POSTGRES_URL`) trên môi trường deploy, đã chạy `npm run db:migrate`, và `npm run db:status` thấy đủ phiên bản. Nếu từng nhận đơn trên SQLite thì đã chạy `npm run db:copy-sqlite`.
- [ ] Thử một thanh toán sandbox: sai chữ ký bị 401, trả hai lần không ra hai mã, số tiền lệch không cấp quyền.
- [ ] `VITE_PREMIUM_LOCK` vẫn tắt trừ khi bạn cố ý khóa một phần mới. Không sửa công thức, câu hỏi, tờ lý thuyết.
