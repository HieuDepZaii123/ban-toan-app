import { createContext } from "react";

export type RouteValue = {
  path: string;
  search: string;
  go: (href: string, mode?: "push" | "replace") => void;
};

export const RouteContext = createContext<RouteValue | null>(null);
