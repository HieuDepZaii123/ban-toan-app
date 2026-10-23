import type { Lang } from "../lib/math.ts";
import { useSlice } from "../lib/store.ts";

export function useLang(): Lang {
  return useSlice((data) => data.lang);
}
