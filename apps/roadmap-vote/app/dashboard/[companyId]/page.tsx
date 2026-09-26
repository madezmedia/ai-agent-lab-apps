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
    <DashboardGate companyId={companyId} appName="Roadmap Vote">
      <AppShell
        kicker="Creator dashboard"
        title="Roadmap Vote"
        lede="Admin view. Members vote inside the experience."
      >
        <section className="lab-card">
          <h2>Account {companyId}</h2>
          <p>
            V1 votes stay in the browser. There is no ballot stored on the server
            and no member list on this page.
          </p>
        </section>
      </AppShell>
    </DashboardGate>
  );
}
