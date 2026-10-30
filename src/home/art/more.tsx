export function Sunset() {
  return (
    <svg className="scene-art" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="set-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b2a6b" />
          <stop offset="0.55" stopColor="#ff7e5f" />
          <stop offset="1" stopColor="#feb47b" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#set-sky)" />
      <circle cx="320" cy="250" r="46" fill="#ffd36b" />
      <path d="M0 250 L120 190 220 230 340 160 460 220 640 180 V360 H0 Z" fill="#3b2a3f" />
    </svg>
  );
}

export function Rainy() {
  return (
    <svg className="scene-art" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="640" height="360" fill="#6d7c8b" />
      <path d="M0 230 L140 180 260 220 400 160 640 210 V360 H0 Z" fill="#3e5344" />
      <g stroke="#d5e4f2" strokeWidth="2">
        <line x1="40" y1="20" x2="28" y2="48" />
        <line x1="120" y1="40" x2="108" y2="72" />
        <line x1="200" y1="16" x2="188" y2="50" />
        <line x1="300" y1="36" x2="286" y2="70" />
        <line x1="420" y1="18" x2="406" y2="54" />
        <line x1="520" y1="44" x2="506" y2="78" />
        <line x1="590" y1="22" x2="576" y2="56" />
      </g>
    </svg>
  );
}

export function Snowy() {
  return (
    <svg className="scene-art" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="640" height="360" fill="#d5e0ea" />
      <path d="M0 240 L160 190 300 230 460 170 640 220 V360 H0 Z" fill="#f7f9fb" />
      <g fill="#fff">
        <circle cx="80" cy="40" r="3" />
        <circle cx="180" cy="70" r="2" />
        <circle cx="260" cy="36" r="2.5" />
        <circle cx="360" cy="80" r="2" />
        <circle cx="470" cy="44" r="3" />
        <circle cx="560" cy="68" r="2" />
      </g>
    </svg>
  );
}

export function Starry() {
  return (
    <svg className="scene-art" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="640" height="360" fill="#070b22" />
      <path d="M0 210 Q320 40 640 160" stroke="#b9c3ff" strokeWidth="28" fill="none" opacity="0.16" />
      <g fill="#f4f1e6">
        <circle cx="70" cy="40" r="1.4" />
        <circle cx="150" cy="70" r="1" />
        <circle cx="240" cy="36" r="1.6" />
        <circle cx="330" cy="84" r="1" />
        <circle cx="430" cy="48" r="1.3" />
        <circle cx="530" cy="30" r="1" />
        <circle cx="590" cy="76" r="1.5" />
      </g>
      <circle cx="120" cy="78" r="14" fill="#f3f0d8" />
      <path d="M0 250 L180 200 320 240 640 190 V360 H0 Z" fill="#0a1028" />
    </svg>
  );
}
