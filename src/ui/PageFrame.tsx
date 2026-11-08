import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader.tsx";

export function PageFrame({ kicker, title, lead, children }: { kicker: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <div className="desk">
      <a className="skip" href="#content">Vào nội dung</a>
      <SiteHeader />
      <main id="content">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {children}
      </main>
    </div>
  );
}
