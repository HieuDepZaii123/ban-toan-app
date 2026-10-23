import { useContext } from "react";
import { RouteContext, type RouteValue } from "./routeContext.ts";

export function useRoute(): RouteValue {
  const value = useContext(RouteContext);
  if (!value) throw new Error("Route");
  return value;
}
