/* Chạy trước khi vẽ trang: dựng kho lưu thay thế khi trình duyệt chặn localStorage, rồi gắn giao diện,
   cỡ chữ và ngôn ngữ đã chọn lên <html>. Tách thành tệp riêng để CSP không cần cho phép script nội tuyến. */
// Safari trước 15.4 chưa có structuredClone; kho tiến độ chỉ chứa dữ liệu JSON nên bản thay này là đủ.
if (typeof structuredClone !== "function") {
  window.structuredClone = function (value) { return JSON.parse(JSON.stringify(value)); };
}
// Some browsers (private modes, school-managed profiles) throw on any storage access.
// Swap in an in-memory store first, so the app still runs; progress just is not kept.
(function () {
  function memory() {
    var data = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
      setItem: function (k, v) { data[k] = String(v); },
      removeItem: function (k) { delete data[k]; },
      clear: function () { data = {}; },
      key: function (i) { return Object.keys(data)[i] || null; },
      get length() { return Object.keys(data).length; },
    };
  }
  ["localStorage", "sessionStorage"].forEach(function (name) {
    try {
      var store = window[name];
      var probe = "__bt_probe__";
      store.setItem(probe, "1");
      store.removeItem(probe);
    } catch (e) {
      try { Object.defineProperty(window, name, { value: memory(), configurable: true }); } catch (e2) {}
    }
  });
})();

try {
  var saved = JSON.parse(localStorage.getItem("ban-toan") || "null");
  var mode = localStorage.getItem("bt-theme");
  var hour = new Date().getHours();
  var dark = false;
  try { dark = window.matchMedia("(prefers-color-scheme: dark)").matches; } catch (e1) {}
  var night = mode === "night" || (mode === "auto" && (hour >= 21 || hour < 5)) || (mode === "system" && dark);
  if (mode !== "day" && mode !== "night" && mode !== "auto" && mode !== "system") night = (saved && saved.theme === "night") || dark;
  var root = document.documentElement;
  root.dataset.theme = night ? "night" : "paper";
  var font = localStorage.getItem("bt-font");
  root.dataset.font = font === "s" || font === "l" || font === "xl" ? font : "m";
  if (localStorage.getItem("bt-read") === "on") root.dataset.read = "on";
  if (localStorage.getItem("bt-contrast") === "on") root.dataset.contrast = "on";
  if (localStorage.getItem("bt-motion") === "less") root.dataset.motion = "less";
  // Lần mở đầu tiên: trình duyệt không đặt tiếng Việt thì mở bản tiếng Anh (App đọc cờ này một lần).
  if (!saved && !localStorage.getItem("bt-lang-auto")) {
    var first = /^vi\b/i.test(navigator.language || "vi") ? "vi" : "en";
    localStorage.setItem("bt-lang-auto", first);
    if (first === "en") document.documentElement.lang = "en";
  }
  if (saved && saved.lang === "en") document.documentElement.lang = "en";
  if (location.pathname === "/" || location.pathname === "") {
    var room = JSON.parse(localStorage.getItem("ban-toan-room") || "null");
    if (!room || room.lamp !== false) document.documentElement.dataset.lamp = "on";
  }
} catch (e) {}
