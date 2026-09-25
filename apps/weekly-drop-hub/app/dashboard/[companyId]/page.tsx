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
    <DashboardGate companyId={companyId} appName="Weekly Drop Hub">
      <AppShell
        kicker="Creator dashboard"
        title="Weekly Drop Hub"
        lede="Admin view for this app. Members read the archive in the experience."
      >
        <section className="lab-card">
          <h2>Account {companyId}</h2>
          <p>
            V1 drops are seeded in the repo. Attaching the app to a product is a
            later step in the Whop dashboard and is not performed here.
          </p>
        </section>
      </AppShell>
    </DashboardGate>
  );
}
