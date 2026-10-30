import type { ReactNode } from "react";
import { A } from "../lib/route.tsx";
import { Logo } from "./Logo.tsx";
import { AreaNav } from "./AreaNav.tsx";
import { Prefs } from "./Prefs.tsx";

export function PageFrame({ kicker, title, lead, children }: { kicker: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <div className="desk">
      <a className="skip" href="#content">Vào nội dung</a>
      <header className="bar">
        <A className="brand" href="/"><Logo /> Bàn Toán</A>
        <AreaNav />
        <Prefs />
      </header>
      <main id="content">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {children}
      </main>
    </div>
  );
}
