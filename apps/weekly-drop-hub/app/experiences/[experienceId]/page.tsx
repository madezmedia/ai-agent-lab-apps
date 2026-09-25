import { ExperienceGate } from "@madez/whop-shared/auth";
import { DropHub } from "@/components/drop-hub";

export const dynamic = "force-dynamic";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;
  return (
    <ExperienceGate experienceId={experienceId} appName="Weekly Drop Hub">
      <DropHub />
    </ExperienceGate>
  );
}
