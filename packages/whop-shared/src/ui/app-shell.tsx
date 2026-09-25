import type { ReactNode } from "react";

export function AppShell({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <main className="lab-page">
      <header>
        <p className="lab-kicker">{kicker}</p>
        <div className="lab-header-row">
          <h1>{title}</h1>
          <p className="lab-brand">Mad EZ · Agent Lab</p>
        </div>
        <p className="lab-lede">{lede}</p>
      </header>
      {children}
    </main>
  );
}
