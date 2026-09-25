import { AppShell } from "./app-shell";

export function DiscoverPage({
  appName,
  summary,
  points,
}: {
  appName: string;
  summary: string;
  points: { title: string; body: string }[];
}) {
  return (
    <AppShell kicker="Discover" title={appName} lede={summary}>
      <div className="lab-points">
        {points.map((point) => (
          <article key={point.title} className="lab-card">
            <h2>{point.title}</h2>
            <p>{point.body}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
