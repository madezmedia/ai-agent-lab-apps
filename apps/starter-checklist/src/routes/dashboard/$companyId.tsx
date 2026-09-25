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
    return <GateFallback status={gate.status} appName="Starter Checklist" />;
  }
  return (
    <AppShell
      kicker="Creator dashboard"
      title="Starter Checklist"
      lede="Admin view. Members follow the path inside the experience."
    >
      <section className="lab-card">
        <h2>Account {companyId}</h2>
        <p>
          The path is static: unlock the kit, open Files, post in the Forum, then
          ship a first build. Product attachment stays in the Whop dashboard.
        </p>
      </section>
    </AppShell>
  );
}
