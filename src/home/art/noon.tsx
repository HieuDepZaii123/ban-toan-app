export function Noon() {
  return (
    <svg className="scene-art" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="n-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5aa6dc" />
          <stop offset="1" stopColor="#d7eef8" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#n-sky)" />
      <circle cx="320" cy="78" r="26" fill="#fff4c8" />
      <circle cx="320" cy="78" r="48" fill="#fff4c8" opacity="0.28" />
      <path d="M0 200 L80 150 160 188 250 118 346 176 438 132 530 170 640 128 V236 H0 Z" fill="#9fb89a" />
      <path d="M0 228 C150 200 240 270 360 228 C490 184 560 250 640 214 V360 H0 Z" fill="#3f7d46" />
      <path d="M40 250 H600 M70 268 H580 M100 286 H540" fill="none" stroke="#2f6236" strokeWidth="3" opacity="0.45" />
      <path d="M-10 300 C100 286 160 324 270 304 C390 282 450 330 560 308 C600 300 620 312 660 304" fill="none" stroke="#c5e4ee" strokeWidth="14" strokeLinecap="round" />
      <path d="M0 328 C200 308 320 352 640 324 V360 H0 Z" fill="#2f6a3c" />
      <g transform="translate(136 188)">
        <rect x="14" y="52" width="7" height="42" fill="#5c4030" />
        <ellipse cx="18" cy="44" rx="28" ry="32" fill="#2f7a40" />
      </g>
      <g transform="translate(400 206)">
        <polygon points="4,32 40,8 76,32" fill="#7a4034" />
        <rect x="16" y="32" width="48" height="36" fill="#f0e2cc" />
        <rect x="34" y="48" width="12" height="20" fill="#5c3b2c" />
      </g>
      <path d="M48 70c16 6 16 6 30 0M500 88c14 6 14 6 26 0" fill="none" stroke="#24506a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
