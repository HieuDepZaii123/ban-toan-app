import { useEffect, useRef, useState } from "react";
import { drillSyncOn, setDrillSync } from "../lib/drillSync.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import {
  addProfile,
  applyBackup,
  clearChat,
  makeBackup,
  readBackup,
  readProfiles,
  removeProfile,
  renameProfile,
  switchProfile,
  wipeDevice,
  type ProfileBook,
} from "../lib/userData.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

function download(name: string, text: string): void {
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function reload(): void {
  window.location.assign("/");
}

/** Trang "Dữ liệu của tôi": hồ sơ trên máy, sao lưu và chuyển máy, những gì rời máy, và xóa dữ liệu. */
export function DataPage() {
  const lang = useLang();
  const [book, setBook] = useState<ProfileBook>(readProfiles);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [sync, setSync] = useState(drillSyncOn);
  const [sure, setSure] = useState(false);
  const [keepKey, setKeepKey] = useState(true);
  const file = useRef<HTMLInputElement>(null);
  const active = book.list.find((item) => item.id === book.active);
  const label = (profile: { name: string }, index: number) => profile.name || t(lang, `Hồ sơ ${index + 1}`, `Profile ${index + 1}`);

  useEffect(() => {
    document.title = t(lang, "Dữ liệu của tôi · Bàn Toán", "My data · Bàn Toán");
  }, [lang]);

  return (
    <PageFrame
      kicker={t(lang, "Trên máy này", "On this device")}
      title={t(lang, "Dữ liệu của tôi", "My data")}
      lead={t(lang, "Bàn Toán không có tài khoản. Tiến độ, sổ lỗi và ghi chú nằm trong trình duyệt của máy này; ở đây bạn sao lưu, chuyển sang máy khác, tách hồ sơ cho từng người, hoặc xóa hết.", "Bàn Toán has no accounts. Progress, the miss book and notes live in this browser; here you can back them up, move them to another device, keep a profile per person, or delete everything.")}
    >
      <p role="status" className="status">{note}</p>

      <section className="tool-card data-card" aria-labelledby="data-profiles">
        <h2 id="data-profiles">{t(lang, "Hồ sơ trên máy này", "Profiles on this device")}</h2>
        <p className="lecture-note">{t(lang, "Dùng khi anh chị em hoặc nhiều học sinh học chung một máy. Mỗi hồ sơ có tiến độ, sổ lỗi, lớp đã chọn và lịch sử trò chuyện riêng. Hồ sơ không có mật khẩu: đây là ngăn riêng, không phải khóa.", "For siblings or several students sharing one device. Each profile has its own progress, miss book, chosen grade and chat history. Profiles have no password: they are separate drawers, not locks.")}</p>
        <ul className="data-list">
          {book.list.map((profile, index) => (
            <li key={profile.id}>
              <span>
                <b>{label(profile, index)}</b>
                {profile.id === book.active ? <small> · {t(lang, "đang mở", "open now")}</small> : null}
              </span>
              <span className="data-actions">
                {profile.id === book.active ? null : (
                  <button type="button" className="text-btn" onClick={() => { switchProfile(profile.id); reload(); }}>
                    {t(lang, "Mở hồ sơ này", "Open this profile")}
                  </button>
                )}
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => {
                    const next = window.prompt(t(lang, "Tên hoặc biệt danh (không cần họ tên thật)", "A name or nickname (no need for a real full name)"), profile.name);
                    if (next === null) return;
                    renameProfile(profile.id, next);
                    setBook(readProfiles());
                  }}
                >
                  {t(lang, "Đổi tên", "Rename")}
                </button>
                {profile.id === book.active ? null : (
                  <button
                    type="button"
                    className="text-btn"
                    onClick={() => {
                      if (!window.confirm(t(lang, `Xóa hồ sơ “${label(profile, index)}” cùng toàn bộ tiến độ của hồ sơ này?`, `Delete the profile “${label(profile, index)}” and all of its progress?`))) return;
                      removeProfile(profile.id);
                      setBook(readProfiles());
                    }}
                  >
                    {t(lang, "Xóa", "Delete")}
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
        <form
          className="data-row"
          onSubmit={(event) => {
            event.preventDefault();
            if (book.list.length >= 8) {
              setNote(t(lang, "Mỗi máy tối đa 8 hồ sơ.", "A device holds at most 8 profiles."));
              return;
            }
            addProfile(name);
            reload();
          }}
        >
          <label>
            <span>{t(lang, "Thêm hồ sơ mới (bắt đầu từ trang trắng)", "Add a profile (starts from a blank page)")}</span>
            <input value={name} maxLength={24} onChange={(event) => setName(event.target.value)} placeholder={t(lang, "Ví dụ: Bông, lớp 3", "For example: Bông, grade 3")} />
          </label>
          <button type="submit" className="text-btn">{t(lang, "Thêm và mở", "Add and open")}</button>
        </form>
      </section>

      <section className="tool-card data-card" aria-labelledby="data-backup">
        <h2 id="data-backup">{t(lang, "Sao lưu và chuyển sang máy khác", "Back up and move to another device")}</h2>
        <p className="lecture-note">{t(lang, "Tệp sao lưu chứa tiến độ, sổ lỗi, đề đang làm, ghi chú, bản soạn và lớp đã chọn của hồ sơ đang mở. Tệp không chứa mã Premium, lịch sử trò chuyện hay thông tin cá nhân nào khác. Trên máy mới, mở trang này rồi chọn tệp để khôi phục.", "The backup file holds the open profile's progress, miss book, papers in progress, notes, drafts and chosen grade. It does not hold the Premium key, chat history or any other personal information. On the new device, open this page and choose the file to restore.")}</p>
        <div className="data-actions">
          <button
            type="button"
            className="pay-btn"
            onClick={() => {
              const backup = makeBackup(active?.name ?? "");
              download(`ban-toan-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(backup));
              setNote(t(lang, "Đã tạo tệp sao lưu. Hãy cất tệp ở nơi bạn tìm lại được.", "Backup file created. Keep it somewhere you can find again."));
            }}
          >
            {t(lang, "Tải tệp sao lưu", "Download a backup file")}
          </button>
          <button type="button" className="text-btn" onClick={() => file.current?.click()}>
            {t(lang, "Khôi phục từ tệp…", "Restore from a file…")}
          </button>
          <input
            ref={file}
            type="file"
            accept="application/json,.json"
            className="sr"
            aria-label={t(lang, "Chọn tệp sao lưu của Bàn Toán", "Choose a Bàn Toán backup file")}
            onChange={(event) => {
              const picked = event.target.files?.[0];
              event.target.value = "";
              if (!picked) return;
              void picked.text().then((text) => {
                const backup = readBackup(text);
                if (!backup) {
                  setNote(t(lang, "Tệp này không phải tệp sao lưu của Bàn Toán.", "This is not a Bàn Toán backup file."));
                  return;
                }
                const when = backup.savedAt ? new Date(backup.savedAt).toLocaleString(lang === "en" ? "en-GB" : "vi-VN") : "";
                if (!window.confirm(t(lang, `Thay tiến độ của hồ sơ đang mở bằng bản sao lưu${when ? ` lúc ${when}` : ""}? Tiến độ hiện tại của hồ sơ này sẽ bị ghi đè.`, `Replace the open profile's progress with the backup${when ? ` from ${when}` : ""}? This profile's current progress will be overwritten.`))) return;
                applyBackup(backup);
                reload();
              });
            }}
          />
        </div>
      </section>

      <section className="tool-card data-card" aria-labelledby="data-out">
        <h2 id="data-out">{t(lang, "Những gì rời khỏi máy", "What leaves this device")}</h2>
        <ul>
          <li>{t(lang, "Trợ lý toán: câu hỏi bạn gửi, sau khi bạn đã bấm đồng ý ở khung trợ lý.", "Maths tutor: the questions you send, after you agreed in the tutor panel.")}</li>
          <li>{t(lang, "Mua Premium: email, gói, số tiền và mã đơn.", "Buying Premium: email, plan, amount and order id.")}</li>
          <li>{t(lang, "Ngoài hai việc đó, không có gì về việc học của bạn được gửi đi, trừ khi bạn bật mục dưới đây.", "Apart from those two, nothing about your study is sent anywhere unless you turn on the option below.")}</li>
        </ul>
        <label className="prefs-row data-toggle">
          <span>
            {t(lang, "Sao lưu ẩn danh trang Luyện chung", "Anonymous backup of the Mixed drill page")}
            <small>{t(lang, "Mặc định tắt. Khi bật, các đáp án bạn chọn ở trang Luyện chung được ghi lên dịch vụ cơ sở dữ liệu Supabase kèm một mã thiết bị ngẫu nhiên, không kèm tên hay email. Tắt đi thì máy thôi gửi.", "Off by default. When on, the answers you pick on the Mixed drill page are written to the Supabase database service with a random device id, with no name or email. Turn it off and the device stops sending.")}</small>
          </span>
          <input
            type="checkbox"
            checked={sync}
            onChange={(event) => {
              setDrillSync(event.target.checked);
              setSync(event.target.checked);
            }}
          />
        </label>
        <p><A href="/chinh-sach">{t(lang, "Đọc Chính sách đầy đủ", "Read the full policy")}</A></p>
      </section>

      <section className="tool-card data-card" aria-labelledby="data-delete">
        <h2 id="data-delete">{t(lang, "Xóa dữ liệu", "Delete data")}</h2>
        <div className="data-actions">
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              clearChat();
              setNote(t(lang, "Đã xóa lịch sử trò chuyện với trợ lý trên máy này.", "Tutor chat history on this device has been deleted."));
            }}
          >
            {t(lang, "Xóa lịch sử trò chuyện", "Delete chat history")}
          </button>
        </div>
        <label className="pay-consent">
          <input type="checkbox" checked={sure} onChange={(event) => setSure(event.target.checked)} />
          <span>{t(lang, "Tôi muốn xóa toàn bộ dữ liệu của Bàn Toán trên trình duyệt này: mọi hồ sơ, tiến độ, sổ lỗi, ghi chú, lịch sử trò chuyện và các tùy chọn. Việc này không hoàn tác được.", "I want to delete all Bàn Toán data in this browser: every profile, progress, the miss book, notes, chat history and settings. This cannot be undone.")}</span>
        </label>
        <label className="pay-consent">
          <input type="checkbox" checked={keepKey} onChange={(event) => setKeepKey(event.target.checked)} />
          <span>{t(lang, "Giữ lại mã Premium trên máy này", "Keep the Premium key on this device")}</span>
        </label>
        <button
          type="button"
          className="pay-btn data-danger"
          disabled={!sure}
          onClick={() => {
            wipeDevice(keepKey);
            reload();
          }}
        >
          {t(lang, "Xóa toàn bộ dữ liệu trên máy này", "Delete all data on this device")}
        </button>
        <p className="lecture-note">{t(lang, "Dữ liệu đơn hàng Premium nằm ở máy chủ thanh toán; muốn xem hoặc xóa, hãy liên hệ theo địa chỉ trong Chính sách.", "Premium order data lives on the payment server; to see or delete it, use the contact in the policy.")}</p>
      </section>
    </PageFrame>
  );
}
