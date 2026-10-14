import { useEffect, useRef, useState } from "react";
import type { Range } from "../content/params.ts";
import { readParams, writeParams } from "../lib/store.ts";

export function useLessonState(id: string, initial: Record<string, number>, ranges: Range) {
  const [values, setValues] = useState(() => readParams(id, initial, ranges));
  const ref = useRef(values);
  ref.current = values;
  const playing = useRef(false);

  useEffect(() => {
    if (playing.current) return;
    writeParams(id, values);
  }, [id, values]);

  const patch = (partial: Record<string, number>, fromPlay = false) => {
    if (!fromPlay) playing.current = false;
    setValues((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const [key, value] of Object.entries(partial)) {
        if (next[key] === value) continue;
        next[key] = value;
        changed = true;
      }
      if (!changed) return prev;
      ref.current = next;
      return next;
    });
  };

  return { values, ref, playing, patch, setValues };
}
