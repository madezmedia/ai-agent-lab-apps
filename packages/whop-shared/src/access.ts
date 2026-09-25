import "server-only";
import { WhopClient, WhopError } from "@whop/sdk";
import { headers } from "next/headers";
import { readServerEnv } from "./env";
import { interpretAccess } from "./interpret-access";
import type { GateResult, GateView } from "./types";
import { verifyUserToken } from "./verify-user-token";

let client: WhopClient | undefined;
let clientToken: string | undefined;

function getClient(token: string): WhopClient {
  if (!client || clientToken !== token) {
    client = new WhopClient({ token });
    clientToken = token;
  }
  return client;
}

export async function gateView(view: GateView, resourceId: string): Promise<GateResult> {
  const apiKey = readServerEnv("WHOP_API_KEY");
  const appId = readServerEnv("NEXT_PUBLIC_WHOP_APP_ID");
  if (!apiKey || !appId) return { status: "misconfigured" };
  if (!resourceId.trim()) return { status: "denied" };

  let userId: string;
  try {
    const headerList = await headers();
    const token = await verifyUserToken(headerList, { appId });
    if (!token) return { status: "denied" };
    userId = token.userId;
  } catch {
    return { status: "denied" };
  }

  try {
    const access = await getClient(apiKey).users.checkAccess({
      id: userId,
      resource_id: resourceId,
    });
    return {
      status: interpretAccess({
        view,
        hasAccess: access.has_access,
        accessLevel: access.access_level,
      }),
    };
  } catch (error) {
    const statusCode = error instanceof WhopError ? error.statusCode : undefined;
    if (statusCode === 401) return { status: "misconfigured" };
    console.error("[whop] access check failed", { view, statusCode: statusCode ?? "unknown" });
    return { status: "unavailable" };
  }
}
