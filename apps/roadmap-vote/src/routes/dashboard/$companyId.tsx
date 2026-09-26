import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { AppShell, GateFallback } from "@madez/whop-shared/ui";
import { gateResource } from "#/server/access";

const loadDashboard = createServerFn({ method: "GET" })
  .validator((companyId: string) => companyId)
  .handler(async ({ data }) => {
    return gateResource("dashboard", data, getRequest().headers);
  });

export const Route = createFileRoute("/dashboard/$companyId")({
  loader: ({ params }) => loadDashboard({ data: params.companyId }),
  component: DashboardPage,
});

function DashboardPage() {
  const gate = Route.useLoaderData();
  const { companyId } = Route.useParams();
  if (gate.status !== "ok") {
    return <GateFallback status={gate.status} appName="Roadmap Vote" />;
  }
  return (
    <AppShell
      kicker="Creator dashboard"
      title="Roadmap Vote"
      lede="Admin view. Members vote inside the experience."
    >
      <section className="lab-card">
        <h2>Account {companyId}</h2>
        <p>V1 votes stay in the browser. There is no ballot stored on the server and no member list on this page.</p>
      </section>
    </AppShell>
  );
}
