import { HomePage } from "@madez/whop-shared/ui";

export default function Page() {
  return (
    <HomePage
      appName="Weekly Drop Hub"
      blurb="Tuesday live builds and Friday skill drops, archived by date for AI Agent Lab members."
      previewHref={process.env.NODE_ENV === "production" ? undefined : "/dev/preview"}
    />
  );
}
