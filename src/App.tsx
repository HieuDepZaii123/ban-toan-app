import { Component, lazy, Suspense, useEffect, type ReactNode } from "react";
import { ChatEntry } from "./chat/ChatEntry.tsx";
import { HomeDesk } from "./home/HomeDesk.tsx";
import { captureReferral } from "./lib/referral.ts";
import { A, RouteProvider } from "./lib/route.tsx";
import { PageFrame } from "./ui/PageFrame.tsx";
import { useRoute } from "./lib/useRoute.ts";
import { setTheme, useSlice } from "./lib/store.ts";
import { t } from "./lib/text.ts";
import { StudyPlayer } from "./study/StudyPlayer.tsx";
import { Atmosphere } from "./ui/Atmosphere.tsx";
import { RightMenu } from "./ui/RightMenu.tsx";
import { effectiveTheme, readThemeMode } from "./ui/themeMode.ts";
import { useLang } from "./ui/useLang.ts";

const TopicDesk = lazy(() => import("./topic/TopicDesk.tsx").then((mod) => ({ default: mod.TopicDesk })));
const Upgrade = lazy(() => import("./premium/Upgrade.tsx").then((mod) => ({ default: mod.Upgrade })));
const ExamPage = lazy(() => import("./pages/ExamPage.tsx").then((mod) => ({ default: mod.ExamPage })));
const ReviewPage = lazy(() => import("./pages/ReviewPage.tsx").then((mod) => ({ default: mod.ReviewPage })));
const StudyPackPage = lazy(() => import("./pages/StudyPackPage.tsx").then((mod) => ({ default: mod.StudyPackPage })));
const PolicyPage = lazy(() => import("./pages/PolicyPage.tsx").then((mod) => ({ default: mod.PolicyPage })));
const ScienceDesk = lazy(() => import("./science/ScienceDesk.tsx").then((mod) => ({ default: mod.ScienceDesk })));
const GradeDesk = lazy(() => import("./grades/GradeDesk.tsx").then((mod) => ({ default: mod.GradeDesk })));
const FormulaPage = lazy(() => import("./pages/FormulaPage.tsx").then((mod) => ({ default: mod.FormulaPage })));
const AssessPage = lazy(() => import("./pages/AssessPage.tsx").then((mod) => ({ default: mod.AssessPage })));
const WorkshopPage = lazy(() => import("./pages/WorkshopPage.tsx").then((mod) => ({ default: mod.WorkshopPage })));
const DrillPage = lazy(() => import("./pages/DrillPage.tsx").then((mod) => ({ default: mod.DrillPage })));
const MissPage = lazy(() => import("./pages/MissPage.tsx").then((mod) => ({ default: mod.MissPage })));
const ReferPage = lazy(() => import("./pages/ReferPage.tsx").then((mod) => ({ default: mod.ReferPage })));
const ResearchIdeasPage = lazy(() => import("./pages/ResearchIdeasPage.tsx").then((mod) => ({ default: mod.ResearchIdeasPage })));
const DocPage = lazy(() => import("./pages/DocPage.tsx").then((mod) => ({ default: mod.DocPage })));
const MethodsPage = lazy(() => import("./pages/MethodsPage.tsx").then((mod) => ({ default: mod.MethodsPage })));
const ThptPracticePage = lazy(() => import("./pages/ThptPracticePage.tsx").then((mod) => ({ default: mod.ThptPracticePage })));
const GradePracticePage = lazy(() => import("./pages/GradePracticePage.tsx").then((mod) => ({ default: mod.GradePracticePage })));

const CHUNK_RELOAD = "ban-toan-chunk-reload";

export default function App() {
  useEffect(() => {
    captureReferral();
    const id = window.setTimeout(() => sessionStorage.removeItem(CHUNK_RELOAD), 4000);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <RouteProvider>
      <Atmosphere />
      <ThemeBridge />
      <Guarded />
      <StudyPlayer />
      <ChatEntry />
      <RightMenu />
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
  if (path === "/nang-cap") return <Upgrade />;
  if (path === "/chinh-sach") return <PolicyPage />;
  if (path === "/thi-thu") return <ExamPage />;
  if (path === "/on-loi-sai") return <ReviewPage />;
  if (path === "/tai-lieu" || path.startsWith("/tai-lieu/")) return <StudyPackPage path={path} />;
  if (path === "/so-cong-thuc") return <FormulaPage />;
  if (path === "/danh-gia") return <AssessPage />;
  if (path === "/xuong-hinh") return <WorkshopPage />;
  if (path === "/luyen") return <DrillPage />;
  if (path === "/so-loi") return <MissPage />;
  if (path === "/gioi-thieu") return <ReferPage />;
  if (path === "/nghien-cuu") return <ResearchIdeasPage />;
  if (path === "/soan-tai-lieu") return <DocPage />;
  if (path === "/phuong-phap" || path.startsWith("/phuong-phap/")) return <MethodsPage path={path} />;
  if (path === "/luyen-lop" || path.startsWith("/luyen-lop/")) return <GradePracticePage path={path} />;
  if (path === "/luyen-thpt") return <ThptPracticePage />;
  if (path === "/khoa-hoc" || path.startsWith("/khoa-hoc/")) return <ScienceDesk path={path} />;
  if (path === "/kien-thuc" || path.startsWith("/kien-thuc/")) return <GradeDesk />;
  if (path === "/" || path === "") return <HomeDesk />;
  return <NotFound />;
}

function NotFound() {
  const lang = useLang();
  useEffect(() => {
    document.title = t(lang, "Không có trang này · Bàn Toán", "Page not found · Bàn Toán");
  }, [lang]);
  return (
    <PageFrame kicker="404" title={t(lang, "Không có trang này", "There is no page here")}>
      <p>{t(lang, "Đường dẫn có thể đã đổi hoặc gõ nhầm.", "The link may have changed or been mistyped.")}</p>
      <p>
        <A href="/">{t(lang, "Về bàn", "Back to the desk")}</A>
        {" · "}
        <A href="/kien-thuc">{t(lang, "Kiến thức lớp 1–12", "Lessons for grades 1–12")}</A>
      </p>
    </PageFrame>
  );
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
    const apply = () => {
      const next = effectiveTheme(readThemeMode(theme));
      document.documentElement.dataset.theme = next;
      document.documentElement.lang = lang === "en" ? "en" : "vi";
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "night" ? "#1c1612" : "#e7e0d2");
      window.dispatchEvent(new Event("ban-toan-theme"));
      if (next !== theme) setTheme(next);
    };
    apply();
    const id = window.setInterval(apply, 60_000);
    return () => window.clearInterval(id);
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
