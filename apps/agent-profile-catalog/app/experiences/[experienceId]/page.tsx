import { ExperienceGate } from "@madez/whop-shared/auth";
import { Catalog } from "@/components/catalog";

export const dynamic = "force-dynamic";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;
  return (
    <ExperienceGate experienceId={experienceId} appName="Agent Profile Catalog">
      <Catalog />
    </ExperienceGate>
  );
}
