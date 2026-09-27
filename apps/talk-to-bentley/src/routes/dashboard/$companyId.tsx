import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { AppShell, GateFallback } from "@madez/whop-shared/ui";
import { gateResource } from "#/server/access";
const loadDashboard = createServerFn({ method: "GET" }).validator((id: string) => id).handler(async ({ data }) => gateResource("dashboard", data, getRequest().headers));
export const Route = createFileRoute("/dashboard/$companyId")({ loader: ({ params }) => loadDashboard({ data: params.companyId }), component: Page });
function Page() {
  const gate = Route.useLoaderData();
  if (gate.status !== "ok") return <GateFallback status={gate.status} appName="Talk to Bentley" />;
  return <AppShell kicker="Creator dashboard" title="Talk to Bentley" lede="Attach to Agent Lab after authorizing the app." />;
}
