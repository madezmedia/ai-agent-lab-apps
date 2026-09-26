import { createFileRoute } from "@tanstack/react-router";
import { DiscoverPage } from "@madez/whop-shared/ui";

export const Route = createFileRoute("/discover")({
  component: Page,
});

function Page() {
  return (
    <DiscoverPage
      appName="Roadmap Vote"
      summary="Members vote on lab proposals. V1 keeps the tally in the browser so the cards can be tried before a database exists."
      points={[
        {
          title: "One vote each",
          body: "Each proposal can be voted once in this session. Refreshing the page restores the seeded counts.",
        },
        {
          title: "Member gate",
          body: "The board renders only after Whop confirms access to this experience.",
        }
      ]}
    />
  );
}
