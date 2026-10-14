export function Evening() {
  return (
    <svg className="scene-art" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="e-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#10182e" />
          <stop offset="0.55" stopColor="#1b2744" />
          <stop offset="1" stopColor="#24324a" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#e-sky)" />
      <g fill="#f4f1e6">
        <circle cx="80" cy="48" r="1.2" />
        <circle cx="140" cy="36" r="1" />
        <circle cx="210" cy="64" r="1.3" />
        <circle cx="280" cy="28" r="1" />
        <circle cx="360" cy="52" r="1.4" />
        <circle cx="430" cy="34" r="1" />
        <circle cx="560" cy="58" r="1.2" />
        <circle cx="600" cy="40" r="1" />
        <circle cx="180" cy="96" r="1" />
        <circle cx="490" cy="84" r="1.1" />
      </g>
      <circle cx="470" cy="82" r="28" fill="#f6f1e2" opacity="0.16" />
      <circle cx="470" cy="82" r="14" fill="#f7f4ea" />
      <path d="M0 210 L90 168 170 204 260 150 352 198 446 162 540 190 640 156 V250 H0 Z" fill="#1a2436" />
      <path d="M0 240 C170 214 260 280 400 238 C520 204 570 266 640 228 V360 H0 Z" fill="#121a28" />
      <path d="M-8 308 C120 292 190 332 310 310 C440 286 510 338 660 308" fill="none" stroke="#24384a" strokeWidth="14" strokeLinecap="round" />
      <path d="M0 332 C220 318 360 352 640 328 V360 H0 Z" fill="#0e1522" />
      <g transform="translate(140 204)">
        <rect x="16" y="48" width="6" height="36" fill="#1a140f" />
        <ellipse cx="19" cy="42" rx="24" ry="28" fill="#152033" />
      </g>
      <g transform="translate(392 218)">
        <polygon points="4,30 40,8 76,30" fill="#241810" />
        <rect x="16" y="30" width="48" height="36" fill="#2a241c" />
        <rect x="22" y="40" width="12" height="9" fill="#ffc56e" />
        <rect x="40" y="40" width="10" height="9" fill="#ffc56e" opacity="0.8" />
        <rect x="34" y="50" width="12" height="16" fill="#1a140f" />
      </g>
    </svg>
  );
}
