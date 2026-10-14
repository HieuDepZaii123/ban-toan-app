export function Morning() {
  return (
    <svg className="scene-art" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="m-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6c99a" />
          <stop offset="0.42" stopColor="#f3dcc4" />
          <stop offset="1" stopColor="#b9d5e4" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#m-sky)" />
      <circle cx="118" cy="214" r="28" fill="#ffe3b0" />
      <circle cx="118" cy="214" r="58" fill="#ffe3b0" opacity="0.35" />
      <path d="M0 214 L70 168 150 206 248 132 338 196 430 150 526 188 640 142 V250 H0 Z" fill="#c5d5c4" />
      <path d="M0 236 C140 210 220 268 340 236 C470 200 540 260 640 228 V360 H0 Z" fill="#8eae8c" />
      <path d="M-10 292 C90 274 150 318 250 296 C360 270 430 324 540 300 C590 290 620 304 660 292" fill="none" stroke="#e7f1f4" strokeWidth="16" strokeLinecap="round" />
      <path d="M0 318 C180 300 300 346 470 322 C560 310 600 336 640 328 V360 H0 Z" fill="#6f8d62" />
      <g transform="translate(148 196)">
        <rect x="14" y="46" width="7" height="40" fill="#6a4a32" />
        <ellipse cx="18" cy="40" rx="26" ry="30" fill="#6d9468" />
      </g>
      <g transform="translate(392 214)">
        <polygon points="4,34 40,12 76,34" fill="#8d4e3c" />
        <rect x="16" y="34" width="48" height="34" fill="#ead8bc" />
        <rect x="34" y="48" width="12" height="20" fill="#6b4634" />
      </g>
      <path d="M40 78c14 8 14 8 28 0M86 64c12 7 12 7 24 0" fill="none" stroke="#6d5a48" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
