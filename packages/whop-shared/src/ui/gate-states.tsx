import type { GateResult } from "../types";
import { AppShell } from "./app-shell";

export function GateFallback({
  status,
  appName,
}: {
  status: Exclude<GateResult["status"], "ok">;
  appName: string;
}) {
  if (status === "misconfigured") return <Misconfigured appName={appName} />;
  if (status === "admin_required") return <AdminRequired appName={appName} />;
  if (status === "unavailable") return <Unavailable appName={appName} />;
  return <AccessDenied appName={appName} />;
}

export function AccessDenied({ appName }: { appName: string }) {
  return (
    <AppShell
      kicker={appName}
      title="Access denied"
      lede="This experience is for AI Agent Lab members."
    >
      <section className="lab-card">
        <h2>No access to this experience</h2>
        <p>
          Whop did not grant this visit access. Open the app from the product
          you belong to, or ask a Mad EZ admin to check the experience.
        </p>
      </section>
    </AppShell>
  );
}

export function AdminRequired({ appName }: { appName: string }) {
  return (
    <AppShell
      kicker={appName}
      title="Admin access required"
      lede="The creator dashboard is limited to account team members."
    >
      <section className="lab-card">
        <h2>Team members only</h2>
        <p>Sign in with an admin role on this Whop account to open the dashboard view.</p>
      </section>
    </AppShell>
  );
}

export function Misconfigured({ appName }: { appName: string }) {
  return (
    <AppShell
      kicker={appName}
      title="App configuration incomplete"
      lede="The server is missing the Whop credentials it needs to check access."
    >
      <section className="lab-card">
        <h2>Set the environment variables</h2>
        <p>
          Add <code>WHOP_API_KEY</code> and <code>NEXT_PUBLIC_WHOP_APP_ID</code> on
          the server, then reload. Do not put the API key in client code.
        </p>
      </section>
    </AppShell>
  );
}

export function Unavailable({ appName }: { appName: string }) {
  return (
    <AppShell
      kicker={appName}
      title="Access check unavailable"
      lede="The app could not confirm access with Whop just now."
    >
      <section className="lab-card">
        <h2>Try again from Whop</h2>
        <p>Member content stays closed until an access check succeeds. Reload this experience from the Whop sidebar.</p>
      </section>
    </AppShell>
  );
}
