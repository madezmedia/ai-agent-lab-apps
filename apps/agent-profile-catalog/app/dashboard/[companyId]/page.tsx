import { DashboardGate } from "@madez/whop-shared/auth";
import { AppShell } from "@madez/whop-shared/ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  return (
    <DashboardGate companyId={companyId} appName="Agent Profile Catalog">
      <AppShell
        kicker="Creator dashboard"
        title="Agent Profile Catalog"
        lede="Admin view. Members search the catalog inside the experience."
      >
        <section className="lab-card">
          <h2>Account {companyId}</h2>
          <p>V1 cards are sample profiles checked into the repo. Nothing here lists members.</p>
        </section>
      </AppShell>
    </DashboardGate>
  );
}
