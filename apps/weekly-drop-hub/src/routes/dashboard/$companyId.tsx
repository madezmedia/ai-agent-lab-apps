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
    return <GateFallback status={gate.status} appName="Weekly Drop Hub" />;
  }
  return (
    <AppShell
      kicker="Creator dashboard"
      title="Weekly Drop Hub"
      lede="Admin view for this app. Members read the archive in the experience."
    >
      <section className="lab-card">
        <h2>Account {companyId}</h2>
        <p>V1 drops are seeded in the repo. Attaching the app to a product stays in the Whop dashboard and is not performed here.</p>
      </section>
    </AppShell>
  );
}
