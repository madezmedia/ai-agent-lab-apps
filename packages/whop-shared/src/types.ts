export type GateView = "experience" | "dashboard";

export type GateResult =
  | { status: "ok" }
  | { status: "denied" }
  | { status: "admin_required" }
  | { status: "misconfigured" }
  | { status: "unavailable" };
