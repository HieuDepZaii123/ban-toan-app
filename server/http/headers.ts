/**
 * Header bảo mật cho trang tĩnh. `vercel.json` chép đúng bảng này (JSON không import được),
 * và `scripts/health.test.ts` kiểm hai nơi khớp nhau. Vite preview cũng gửi cùng bảng.
 *
 * CSP: không script nội tuyến (đoạn chạy sớm nằm ở /boot.js), không eval, không khung ngoài trừ YouTube
 * cho video bài giảng. `style-src` cần 'unsafe-inline' vì KaTeX và sơ đồ đặt style trực tiếp trên phần tử.
 * `connect-src` có Supabase cho mục sao lưu ẩn danh mà người học tự bật.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self' https://*.supabase.co",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};
