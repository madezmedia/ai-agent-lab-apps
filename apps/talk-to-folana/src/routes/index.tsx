import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { GateFallback } from "@madez/whop-shared/ui";
import { PersonaChat } from "#/components/persona-chat";
import { gateResource } from "#/server/access";

const COMPANY_ID = "biz_EFva9rJXKAfThM";

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
    return (
      <GateFallback status={gate.status} appName="Talk to Folana" productName="EZ Influencer Lab" />
    );
  }
  return <PersonaChat />;
}
