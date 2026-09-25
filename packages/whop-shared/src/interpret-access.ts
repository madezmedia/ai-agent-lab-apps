import type { GateView } from "./types";

export type { GateResult, GateView } from "./types";

export function interpretAccess(input: {
  view: GateView;
  hasAccess: boolean;
  accessLevel: string;
}): "ok" | "denied" | "admin_required" {
  if (input.view === "dashboard") {
    return input.accessLevel === "admin" ? "ok" : "admin_required";
  }
  return input.hasAccess ? "ok" : "denied";
}
