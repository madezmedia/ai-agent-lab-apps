import { DiscoverPage } from "@madez/whop-shared/ui";

export default function Page() {
  return (
    <DiscoverPage
      appName="Agent Profile Catalog"
      summary="Sample agent cards members can search by name, role, or tag. V1 is a stub catalog, not a live directory."
      points={[
        {
          title: "Search first",
          body: "Filter the shelf by the job an agent does. The cards are sample profiles for the lab, not member accounts.",
        },
        {
          title: "Member gate",
          body: "The catalog renders only after Whop confirms access to this experience.",
        },
      ]}
    />
  );
}
