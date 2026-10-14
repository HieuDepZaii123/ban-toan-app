export function Afternoon() {
  return (
    <svg className="scene-art" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="a-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f28a52" />
          <stop offset="0.46" stopColor="#f6c48a" />
          <stop offset="1" stopColor="#c4889a" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#a-sky)" />
      <circle cx="520" cy="196" r="30" fill="#ffd7a4" />
      <circle cx="520" cy="196" r="64" fill="#ffd7a4" opacity="0.32" />
      <path d="M0 206 L86 158 168 198 258 140 350 192 442 154 534 186 640 150 V246 H0 Z" fill="#c49884" />
      <path d="M0 232 C160 204 250 276 380 232 C500 192 560 258 640 220 V360 H0 Z" fill="#7a5344" />
      <ellipse cx="250" cy="300" rx="90" ry="10" fill="#4a3028" opacity="0.28" />
      <path d="M-8 304 C110 286 180 332 300 308 C420 284 490 336 650 306" fill="none" stroke="#f0c8a4" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
      <path d="M0 330 C220 314 340 352 640 326 V360 H0 Z" fill="#5c4036" />
      <g transform="translate(132 196)">
        <rect x="14" y="50" width="7" height="40" fill="#4e3428" />
        <ellipse cx="18" cy="42" rx="26" ry="30" fill="#5c7048" />
      </g>
      <g transform="translate(386 214)">
        <polygon points="4,32 40,10 76,32" fill="#6e342c" />
        <rect x="16" y="32" width="48" height="34" fill="#e6c8a4" />
        <rect x="34" y="46" width="12" height="20" fill="#4a2e24" />
        <rect x="22" y="40" width="10" height="8" fill="#ffd09a" />
      </g>
    </svg>
  );
}
