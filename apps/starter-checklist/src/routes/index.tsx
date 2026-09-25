import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { GateFallback } from "@madez/whop-shared/ui";
import { Checklist } from "#/components/checklist";
import { gateResource } from "#/server/access";

const COMPANY_ID = "biz_KcfL8Gsb1rw7SL";

const loadHome = createServerFn({ method: "GET" }).handler(async () => {
  return gateResource("experience", COMPANY_ID, getRequest().headers);
});

export const Route = createFileRoute("/")({
  loader: () => loadHome(),
  component: Home,
});

function Home() {
  const gate = Route.useLoaderData();
  if (gate.status !== "ok") {
    return <GateFallback status={gate.status} appName="Starter Checklist" />;
  }
  return <Checklist />;
}
