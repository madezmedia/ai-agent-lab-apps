import { createFileRoute } from "@tanstack/react-router";
import { DiscoverPage } from "@madez/whop-shared/ui";

export const Route = createFileRoute("/discover")({
  component: Page,
});

function Page() {
  return (
    <DiscoverPage
      appName="Talk to Folana"
      summary="Member chat with Folana, an AI artist. Human team produces the work."
      points={[
        { title: "Disclosed", body: "Every session starts with the AI-artist line." },
        { title: "Creator lane", body: "Music and clips. Agent Lab stays on the other Whop." },
      ]}
    />
  );
}
