import { ExperienceGate } from "@madez/whop-shared/auth";
import { RoadmapBoard } from "@/components/roadmap-board";

export const dynamic = "force-dynamic";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;
  return (
    <ExperienceGate experienceId={experienceId} appName="Roadmap Vote">
      <RoadmapBoard />
    </ExperienceGate>
  );
}
