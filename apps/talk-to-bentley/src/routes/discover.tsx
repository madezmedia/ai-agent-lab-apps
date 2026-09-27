import { createFileRoute } from "@tanstack/react-router";
import { DiscoverPage } from "@madez/whop-shared/ui";
export const Route = createFileRoute("/discover")({ component: Page });
function Page() {
  return <DiscoverPage appName="Talk to Bentley" summary="Member-facing Lab concierge. Not the internal verifier." points={[{ title: "Lab only", body: "Drops, checklist, memory. No email export." }]} />;
}
