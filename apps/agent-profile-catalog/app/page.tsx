import { HomePage } from "@madez/whop-shared/ui";

export default function Page() {
  return (
    <HomePage
      appName="Agent Profile Catalog"
      blurb="A searchable shelf of sample agents used in AI Agent Lab."
      previewHref={process.env.NODE_ENV === "production" ? undefined : "/dev/preview"}
    />
  );
}
