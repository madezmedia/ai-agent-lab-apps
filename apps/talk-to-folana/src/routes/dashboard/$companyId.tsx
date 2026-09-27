import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { AppShell, GateFallback } from "@madez/whop-shared/ui";
import { gateResource } from "#/server/access";

const loadDashboard = createServerFn({ method: "GET" })
  .validator((companyId: string) => companyId)
  .handler(async ({ data }) => gateResource("dashboard", data, getRequest().headers));

export const Route = createFileRoute("/dashboard/$companyId")({
  loader: ({ params }) => loadDashboard({ data: params.companyId }),
  component: DashboardPage,
});

function DashboardPage() {
  const gate = Route.useLoaderData();
  if (gate.status !== "ok") {
    return <GateFallback status={gate.status} appName="Talk to Folana" />;
  }
  return (
    <AppShell kicker="Creator dashboard" title="Talk to Folana" lede="Attach this app to the Influencer hub in Whop.">
      <section className="lab-card">
        <p>Public Bentley/QA tools stay out of this room. LLM hook is PERSONA_CHAT_URL when ready.</p>
      </section>
    </AppShell>
  );
}
