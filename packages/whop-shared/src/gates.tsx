import "server-only";
import type { ReactNode } from "react";
import { gateView } from "./access";
import { GateFallback } from "./ui/gate-states";

export async function ExperienceGate({
  experienceId,
  appName,
  children,
}: {
  experienceId: string;
  appName: string;
  children: ReactNode;
}) {
  const gate = await gateView("experience", experienceId);
  if (gate.status !== "ok") {
    return <GateFallback status={gate.status} appName={appName} />;
  }
  return children;
}

export async function DashboardGate({
  companyId,
  appName,
  children,
}: {
  companyId: string;
  appName: string;
  children: ReactNode;
}) {
  const gate = await gateView("dashboard", companyId);
  if (gate.status !== "ok") {
    return <GateFallback status={gate.status} appName={appName} />;
  }
  return children;
}
