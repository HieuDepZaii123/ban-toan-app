import { Component, lazy, Suspense, useEffect, type ReactNode } from "react";
import { HomeDesk } from "./home/HomeDesk.tsx";
import { RouteProvider, useRoute } from "./lib/route.tsx";
import { useSlice } from "./lib/store.ts";

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

function Shell() {
  const { path } = useRoute();
  if (path.startsWith("/t/")) {
    const id = decodeURIComponent(path.slice(3));
    return <TopicDesk id={id} />;
  }
  return <HomeDesk />;
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
    if (this.state.message) {
      return (
        <main className="desk">
          <h1>Bàn gặp lỗi</h1>
          <p>{this.state.message}</p>
          <a href="/">Về bàn</a>
        </main>
      );
    }
    return this.props.children;
  }
}
