import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { GateFallback } from "@madez/whop-shared/ui";
import { PersonaChat } from "#/components/persona-chat";
import { gateResource } from "#/server/access";
const loadExperience = createServerFn({ method: "GET" }).validator((experienceId: string) => experienceId).handler(async ({ data }) => gateResource("experience", data, getRequest().headers));
export const Route = createFileRoute("/experiences/$experienceId")({ loader: ({ params }) => loadExperience({ data: params.experienceId }), component: Page });
function Page() {
  const gate = Route.useLoaderData();
  if (gate.status !== "ok") return <GateFallback status={gate.status} appName="Talk to Bentley" />;
  return <PersonaChat />;
}
