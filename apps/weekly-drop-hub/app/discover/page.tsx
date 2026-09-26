import { DiscoverPage } from "@madez/whop-shared/ui";

export default function Page() {
  return (
    <DiscoverPage
      appName="Weekly Drop Hub"
      summary="A dated archive of the lab's Tuesday live builds and Friday skill drops, with a download and a notes link on every drop."
      points={[
        {
          title: "Two lanes",
          body: "Tuesday is a live build. Friday is a skill drop. Filters keep the archive readable after a few months.",
        },
        {
          title: "Member gate",
          body: "The archive renders only after Whop confirms the visitor can open this experience.",
        },
      ]}
    />
  );
}
