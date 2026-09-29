import "server-only";
import type { ReactNode } from "react";
import { gateView } from "./access";
import { GateFallback } from "./ui/gate-states";

export async function ExperienceGate({
  experienceId,
  appName,
  productName,
  brand,
  children,
}: {
  experienceId: string;
  appName: string;
  productName?: string;
  brand?: string;
  children: ReactNode;
}) {
  const gate = await gateView("experience", experienceId);
  if (gate.status !== "ok") {
    return (
      <GateFallback status={gate.status} appName={appName} productName={productName} brand={brand} />
    );
  }
  return children;
}

export async function DashboardGate({
  companyId,
  appName,
  productName,
  brand,
  children,
}: {
  companyId: string;
  appName: string;
  productName?: string;
  brand?: string;
  children: ReactNode;
}) {
  const gate = await gateView("dashboard", companyId);
  if (gate.status !== "ok") {
    return (
      <GateFallback status={gate.status} appName={appName} productName={productName} brand={brand} />
    );
  }
  return children;
}
