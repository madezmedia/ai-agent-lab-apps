import type { GateResult } from "../types";
import { AppShell } from "./app-shell";

const DEFAULT_PRODUCT_NAME = "AI Agent Lab";

type GateCopy = {
  appName: string;
  /** Membership product in the access-denied lede. Defaults to AI Agent Lab. */
  productName?: string;
  /** Header lockup. A custom productName is used when this is omitted. */
  brand?: string;
};

function shellBrand(productName?: string, brand?: string): string | undefined {
  if (brand) return brand;
  if (productName && productName !== DEFAULT_PRODUCT_NAME) return productName;
  return undefined;
}

export function GateFallback({
  status,
  appName,
  productName,
  brand,
}: GateCopy & {
  status: Exclude<GateResult["status"], "ok">;
}) {
  if (status === "misconfigured") {
    return <Misconfigured appName={appName} productName={productName} brand={brand} />;
  }
  if (status === "admin_required") {
    return <AdminRequired appName={appName} productName={productName} brand={brand} />;
  }
  if (status === "unavailable") {
    return <Unavailable appName={appName} productName={productName} brand={brand} />;
  }
  return <AccessDenied appName={appName} productName={productName} brand={brand} />;
}

export function AccessDenied({
  appName,
  productName = DEFAULT_PRODUCT_NAME,
  brand,
}: GateCopy) {
  return (
    <AppShell
      kicker={appName}
      title="Access denied"
      lede={`This experience is for ${productName} members.`}
      brand={shellBrand(productName, brand)}
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

export function AdminRequired({ appName, productName, brand }: GateCopy) {
  return (
    <AppShell
      kicker={appName}
      title="Admin access required"
      lede="The creator dashboard is limited to account team members."
      brand={shellBrand(productName, brand)}
    >
      <section className="lab-card">
        <h2>Team members only</h2>
        <p>Sign in with an admin role on this Whop account to open the dashboard view.</p>
      </section>
    </AppShell>
  );
}

export function Misconfigured({ appName, productName, brand }: GateCopy) {
  return (
    <AppShell
      kicker={appName}
      title="App configuration incomplete"
      lede="The server is missing the Whop credentials it needs to check access."
      brand={shellBrand(productName, brand)}
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

export function Unavailable({ appName, productName, brand }: GateCopy) {
  return (
    <AppShell
      kicker={appName}
      title="Access check unavailable"
      lede="The app could not confirm access with Whop just now."
      brand={shellBrand(productName, brand)}
    >
      <section className="lab-card">
        <h2>Try again from Whop</h2>
        <p>Member content stays closed until an access check succeeds. Reload this experience from the Whop sidebar.</p>
      </section>
    </AppShell>
  );
}
