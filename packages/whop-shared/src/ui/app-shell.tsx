import type { ReactNode } from "react";

const DEFAULT_BRAND = "Mad EZ · Agent Lab";

export function AppShell({
  kicker,
  title,
  lede,
  children,
  brand = DEFAULT_BRAND,
}: {
  kicker: string;
  title: string;
  lede: string;
  children?: ReactNode;
  /** Header lockup. Omit to keep Mad EZ · Agent Lab. */
  brand?: string;
}) {
  return (
    <main className="lab-page">
      <header>
        <p className="lab-kicker">{kicker}</p>
        <div className="lab-header-row">
          <h1>{title}</h1>
          <p className="lab-brand">{brand}</p>
        </div>
        <p className="lab-lede">{lede}</p>
      </header>
      {children}
    </main>
  );
}
