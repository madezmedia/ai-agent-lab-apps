import { HomePage } from "@madez/whop-shared/ui";

export default function Page() {
  return (
    <HomePage
      appName="Roadmap Vote"
      blurb="Proposal cards for what AI Agent Lab should build next."
      previewHref={process.env.NODE_ENV === "production" ? undefined : "/dev/preview"}
    />
  );
}
