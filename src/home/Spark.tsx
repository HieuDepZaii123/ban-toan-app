export function Spark({ id }: { id: string }) {
  return (
    <svg className="spark" viewBox="0 0 32 32" aria-hidden="true">
      {id === "quadratic" ? <path d="M5 8 Q16 30 27 8" /> : null}
      {id === "ineq" ? <path d="M4 16 H20" /> : null}
      {id === "ineq" ? <circle cx="20" cy="16" r="2.2" /> : null}
      {id === "exp" ? <path d="M6 24 C12 24 14 8 26 8" /> : null}
      {id === "sequence" ? (
        <>
          <path d="M7 22 V14" />
          <path d="M13 22 V12" />
          <path d="M19 22 V9" />
          <path d="M25 22 V7" />
        </>
      ) : null}
      {id === "trig" ? (
        <>
          <circle cx="14" cy="16" r="8" />
          <path d="M14 16 H22" />
          <path d="M22 16 V10" />
        </>
      ) : null}
      {id === "limit" ? <path d="M5 22 C10 22 12 10 16 10 C20 10 22 22 27 22" /> : null}
      {id === "derivative" ? (
        <>
          <path d="M5 24 Q16 6 27 20" />
          <path d="M8 20 L24 12" />
        </>
      ) : null}
      {id === "survey" ? <path d="M4 22 C8 22 10 8 16 16 C22 24 24 10 28 10" /> : null}
      {id === "integral" ? (
        <>
          <path d="M6 22 H26" />
          <path d="M6 22 C10 22 12 8 16 8 C22 8 24 18 26 18" />
        </>
      ) : null}
      {id === "vector" ? (
        <>
          <path d="M6 24 L14 10" />
          <path d="M6 24 L24 20" />
        </>
      ) : null}
      {id === "analytic" ? (
        <>
          <path d="M5 24 L27 8" />
          <circle cx="20" cy="20" r="2" />
          <path d="M20 20 L16 12" />
        </>
      ) : null}
      {id === "triangle" ? <path d="M6 26 L16 6 L26 26 Z" /> : null}
      {id === "combo" ? (
        <>
          <circle cx="16" cy="8" r="1.6" />
          <circle cx="11" cy="16" r="1.6" />
          <circle cx="21" cy="16" r="1.6" />
          <circle cx="8" cy="24" r="1.6" />
          <circle cx="16" cy="24" r="1.6" />
          <circle cx="24" cy="24" r="1.6" />
        </>
      ) : null}
      {id === "probability" ? (
        <>
          <rect x="6" y="8" width="12" height="12" rx="2" />
          <circle cx="10" cy="12" r="1" />
          <circle cx="14" cy="16" r="1" />
        </>
      ) : null}
    </svg>
  );
}
