import { createFileRoute } from "@tanstack/react-router";
import { DiscoverPage } from "@madez/whop-shared/ui";

export const Route = createFileRoute("/discover")({
  component: Page,
});

function Page() {
  return (
    <DiscoverPage
      appName="Starter Checklist"
      summary="A four-step path that gets a new lab member from the starter kit to a first build."
      points={[
        {
          title: "One order",
          body: "Unlock the path kit, open Files, post in the Forum, then ship the first build.",
        },
        {
          title: "Member gate",
          body: "The checklist renders only after Whop confirms access.",
        },
      ]}
    />
  );
}
