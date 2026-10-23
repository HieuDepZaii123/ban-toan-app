import { Component, lazy, Suspense, useEffect, type ReactNode } from "react";
import { HomeDesk } from "./home/HomeDesk.tsx";
import { A, RouteProvider } from "./lib/route.tsx";
import { useRoute } from "./lib/useRoute.ts";
import { useSlice } from "./lib/store.ts";
import { t } from "./lib/text.ts";
import { useLang } from "./ui/useLang.ts";

const TopicDesk = lazy(() => import("./topic/TopicDesk.tsx").then((mod) => ({ default: mod.TopicDesk })));

const CHUNK_RELOAD = "ban-toan-chunk-reload";

export default function App() {
  useEffect(() => {
    const id = window.setTimeout(() => sessionStorage.removeItem(CHUNK_RELOAD), 4000);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <RouteProvider>
      <ThemeBridge />
      <Guarded />
    </RouteProvider>
  );
}

function Guarded() {
  const { path } = useRoute();
  return (
    <Boundary key={path}>
      <Suspense fallback={<p className="loading">Đang mở tờ…</p>}>
        <Shell />
      </Suspense>
    </Boundary>
  );
}

function topicId(path: string): string {
  try {
    return decodeURIComponent(path.slice(3));
  } catch {
    return "";
  }
}

function Shell() {
  const { path } = useRoute();
  if (path.startsWith("/t/")) return <TopicDesk id={topicId(path)} />;
  return <HomeDesk />;
}

function Broken() {
  const lang = useLang();
  return (
    <main className="desk" id="content">
      <h1>{t(lang, "Bàn gặp lỗi", "The desk hit an error")}</h1>
      <p>{t(lang, "Tờ này chưa mở được. Về bàn rồi thử lại.", "This sheet did not open. Go back to the desk and try again.")}</p>
      <A href="/">{t(lang, "Về bàn", "Back to the desk")}</A>
    </main>
  );
}

function ThemeBridge() {
  const theme = useSlice((data) => data.theme);
  const lang = useSlice((data) => data.lang);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang === "en" ? "en" : "vi";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "night" ? "#121411" : "#e7e0d2");
    window.dispatchEvent(new Event("ban-toan-theme"));
  }, [theme, lang]);
  return null;
}

function chunkFailed(error: unknown): boolean {
  const text = error instanceof Error ? `${error.name} ${error.message}` : String(error);
  return /dynamically imported module|Importing a module script failed|ChunkLoadError/i.test(text);
}

class Boundary extends Component<{ children: ReactNode }, { message: string | null }> {
  state = { message: null as string | null };

  static getDerivedStateFromError(error: unknown) {
    return { message: error instanceof Error ? error.message : "Lỗi" };
  }

  componentDidCatch(error: unknown) {
    if (!chunkFailed(error)) return;
    if (sessionStorage.getItem(CHUNK_RELOAD) === "1") return;
    sessionStorage.setItem(CHUNK_RELOAD, "1");
    window.location.reload();
  }

  render() {
    if (this.state.message) return <Broken />;
    return this.props.children;
  }
}
