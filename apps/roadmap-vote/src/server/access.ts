import { interpretAccess } from "@madez/whop-shared/interpret-access";
import { verifyUserToken } from "@madez/whop-shared/verify-user-token";
import type { GateResult, GateView } from "@madez/whop-shared/interpret-access";

const APP_ID = "app_2uAwcCSXpXHmrm";

type HeaderBag = {
  get(name: string): string | null;
};

function asHeaderBag(headers: Headers | Record<string, string | undefined>): HeaderBag {
  if (typeof (headers as Headers).get === "function") {
    return headers as Headers;
  }
  const record = headers as Record<string, string | undefined>;
  return {
    get(name: string) {
      return record[name] ?? record[name.toLowerCase()] ?? null;
    },
  };
}

function appId(): string {
  return process.env.APP_ID || process.env.WHOP_APP_ID || process.env.NEXT_PUBLIC_WHOP_APP_ID || APP_ID;
}

export async function gateResource(
  view: GateView,
  resourceId: string,
  requestHeaders: Headers | Record<string, string | undefined>,
): Promise<GateResult> {
  if (!resourceId.trim()) return { status: "denied" };

  let userId: string;
  try {
    const token = await verifyUserToken(asHeaderBag(requestHeaders), { appId: appId() });
    if (!token) return { status: "denied" };
    userId = token.userId;
  } catch {
    return { status: "denied" };
  }

  const origin = (process.env.WHOP_API_ORIGIN ?? "https://api.whop.com").replace(/\/$/, "");
  const headers: Record<string, string> = { accept: "application/json" };
  if (process.env.WHOP_API_KEY) {
    headers.authorization = `Bearer ${process.env.WHOP_API_KEY}`;
  }

  try {
    const response = await fetch(
      `${origin}/api/v1/users/${encodeURIComponent(userId)}/access/${encodeURIComponent(resourceId)}`,
      { headers },
    );
    if (response.status === 401) return { status: "misconfigured" };
    if (!response.ok) return { status: "unavailable" };
    const access = (await response.json()) as { has_access?: boolean; access_level?: string };
    return {
      status: interpretAccess({
        view,
        hasAccess: Boolean(access.has_access),
        accessLevel: access.access_level ?? "no_access",
      }),
    };
  } catch (error) {
    console.error("[whop] access check failed", {
      view,
      message: error instanceof Error ? error.name : "error",
    });
    return { status: "unavailable" };
  }
}
