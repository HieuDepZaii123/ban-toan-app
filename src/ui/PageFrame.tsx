import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader.tsx";
import { SiteFooter } from "./SiteFooter.tsx";
import { t } from "../lib/text.ts";
import { useLang } from "./useLang.ts";

export function PageFrame({ kicker, title, lead, children }: { kicker: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <div className="desk">
      <a className="skip" href="#content">{t(useLang(), "Vào nội dung", "Skip to content")}</a>
      <SiteHeader />
      <main id="content">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
