import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

type RouteValue = {
  path: string;
  search: string;
  go: (href: string, mode?: "push" | "replace") => void;
};

const RouteContext = createContext<RouteValue | null>(null);

function current(): { path: string; search: string } {
  let path = window.location.pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return { path, search: window.location.search };
}

export function RouteProvider({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState(current);
  useEffect(() => {
    const onPop = () => setLoc(current());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = (href: string, mode: "push" | "replace" = "push") => {
    const url = new URL(href, window.location.origin);
    let path = url.pathname;
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    const next = `${path}${url.search}`;
    const now = `${window.location.pathname}${window.location.search}`;
    if (next === now) return;
    window.history[mode === "push" ? "pushState" : "replaceState"](null, "", next);
    setLoc({ path, search: url.search });
    if (mode === "push") window.scrollTo(0, 0);
  };

  return <RouteContext.Provider value={{ path: loc.path, search: loc.search, go }}>{children}</RouteContext.Provider>;
}

export function useRoute(): RouteValue {
  const value = useContext(RouteContext);
  if (!value) throw new Error("Route");
  return value;
}

export function A({
  href,
  mode = "push",
  className,
  children,
  ...rest
}: {
  href: string;
  mode?: "push" | "replace";
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const { go } = useRoute();
  return (
    <a
      href={href}
      className={className}
      {...rest}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        go(href, mode);
      }}
    >
      {children}
    </a>
  );
}
