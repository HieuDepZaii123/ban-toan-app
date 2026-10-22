import { useEffect, useState } from "react";

/** Announces the figure after the slider settles, so a drag is not read number by number. */
export function Live({ text }: { text: string }) {
  const [live, setLive] = useState(text);
  useEffect(() => {
    const id = window.setTimeout(() => setLive(text), 450);
    return () => window.clearTimeout(id);
  }, [text]);
  return (
    <p className="sr" role="status" aria-live="polite">
      {live}
    </p>
  );
}
