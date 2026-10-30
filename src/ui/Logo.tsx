export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg className="bt-logo" viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" focusable="false">
      <rect x="3" y="30" width="42" height="5" rx="2" fill="currentColor" opacity="0.35" />
      <path d="M24 6 L13 30 M24 6 L35 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="7" r="3.2" fill="var(--logo-accent)" />
      <path d="M16.5 22 A10 10 0 0 0 31.5 22" stroke="var(--logo-accent)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <text x="24" y="45" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor" fontFamily="Georgia, serif">π</text>
    </svg>
  );
}
