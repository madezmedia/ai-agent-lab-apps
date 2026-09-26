import { AppShell } from "./app-shell";

export function HomePage({
  appName,
  blurb,
  previewHref,
}: {
  appName: string;
  blurb: string;
  previewHref?: string;
}) {
  return (
    <AppShell kicker="Mad EZ Media" title={appName} lede={blurb}>
      <section className="lab-card">
        <h2>Opens inside Whop</h2>
        <p>
          Members land on <code>/experiences/[experienceId]</code>. Creators use{" "}
          <code>/dashboard/[companyId]</code>. This root page is only a signpost.
        </p>
        {previewHref ? (
          <div className="lab-card-actions">
            <a className="lab-button lab-button-primary" href={previewHref}>
              Preview the member view
            </a>
          </div>
        ) : null}
      </section>
    </AppShell>
  );
}
