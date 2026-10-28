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
| `POST /api/premium/crypto` | Đổi mạng khi đơn còn chờ, dán mã giao dịch để đối soát on-chain, hoặc `{ "watch": true }` để worker rà các đơn đã có mã |

Chữ ký tạo đơn, đúng thứ tự tài liệu captureWallet:

`accessKey, amount, extraData, ipnUrl, orderId, orderInfo, partnerCode, redirectUrl, requestId, requestType`

Chữ ký IPN:

`accessKey, amount, extraData, message, orderId, orderInfo, orderType, partnerCode, payType, requestId, responseTime, resultCode, transId`

`accessKey` không có trong body IPN. Server tự ghép từ biến môi trường.

VietQR: tag `38` chứa GUID `A000000727`, BIN, số tài khoản và dịch vụ `QRIBFTTA`. Tag `63` là CRC-16/CCITT-FALSE trên cả chuỗi kể cả `6304`. Giá trị kiểm của thuật toán với `123456789` là `29B1`.

Cờ `PREMIUM_LOCK` / `VITE_PREMIUM_LOCK` mặc định tắt. Không tờ nào đọc cờ này để giấu bài. Bật `1` chỉ để một lớp sau này khóa phần mới, không đụng công thức hay câu hỏi đã có.

## Kho dữ liệu

Mặc định là SQLite qua `node:sqlite`, file `PREMIUM_DB_PATH` (dev: `data/premium.sqlite`).

Adapter là `PayStore` trong `server/pay/store.ts`: `insertOrder`, `getOrder`, `getByTransfer`, `getByLicense`, `markPaid`. `markPaid` chạy một transaction, chỉ cập nhật đơn `pending`, và ghi `payment_events` với khóa `(event_kind, event_id)`.

Đổi sang Postgres hoặc KV khi deploy:

1. Viết một object cùng kiểu `PayStore`. `markPaid` phải giữ `UPDATE … WHERE status = 'pending'` và khóa duy nhất của sự kiện thanh toán.
2. Trong `storeFor`, nếu `PREMIUM_STORE=postgres` thì mở adapter đó thay vì SQLite.
3. Đừng dùng file SQLite trên Vercel: đĩa chỉ ghi được ở `/tmp` và mất khi instance tắt. Trang IPN có thể rơi vào instance khác.

Gợi ý cột Postgres: cùng tên với bảng `orders` và `payment_events` trong `openStore`. Đơn crypto thêm `crypto_chain`, `crypto_asset`, `crypto_units` (đơn vị nhỏ nhất của token, dạng chữ), `crypto_rate`, `crypto_suffix`, `crypto_source` (`live` hoặc `config`), `crypto_tx`.

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

Mở [http://127.0.0.1:43123/nang-cap](http://127.0.0.1:43123/nang-cap). Vite gắn `/api/premium` ngay trên cổng 43123. Không cần khóa MoMo riêng: thiếu biến thì server dùng bộ sandbox công khai trong `.env.example`.

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

## Lấy khóa MoMo doanh nghiệp

1. Đăng ký đối tác tại [https://business.momo.vn/](https://business.momo.vn/).
2. Tích hợp trên sandbox `https://test-payment.momo.vn` trước. Bộ `partnerCode=MOMO`, `accessKey=F8BBA842ECF85`, `secretKey=K951B6PE1waDMi640xX08PD3vg6EkVlz` là khóa **test công khai**, không nhận tiền thật.
3. Khai báo `ipnUrl` và `redirectUrl` là URL HTTPS công khai. MoMo không gọi được `127.0.0.1`. Dùng một tunnel khi thử IPN trên máy.
4. Sau UAT, MoMo cấp `partnerCode`, `accessKey`, `secretKey` production. Đặt vào biến môi trường của host, không commit, không đưa vào `VITE_`.
5. Endpoint production là `https://payment.momo.vn/v2/gateway/api/create`.

## Deploy

Repo đã có `vercel.json`: build `npm run build`, thư mục `dist`, rewrite SPA trừ `/api/`. Mỗi file trong `api/premium/` là một hàm Node.

Đặt biến: `MOMO_*`, `PREMIUM_PRICE_*`, `PUBLIC_BASE_URL` (không dấu `/` cuối), `BANK_*`, `BANK_WEBHOOK_SECRET`, `ADMIN_TOKEN`, `CRYPTO_*`, `PREMIUM_DB_PATH` hoặc adapter Postgres. `PUBLIC_BASE_URL` phải là origin mà MoMo và trình duyệt cùng thấy. Không đặt khóa riêng của ví.

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
- [ ] SQLite local không phải kho production. Đã có `PayStore` trên Postgres hoặc KV, và IPN với redirect rơi vào hai instance vẫn thấy cùng một đơn.
- [ ] Thử một thanh toán sandbox: sai chữ ký bị 401, trả hai lần không ra hai mã, số tiền lệch không cấp quyền.
- [ ] `VITE_PREMIUM_LOCK` vẫn tắt trừ khi bạn cố ý khóa một phần mới. Không sửa công thức, câu hỏi, tờ lý thuyết.
