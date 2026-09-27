// Bearer-token check. Every request must carry `Authorization: Bearer <ACMI_MCP_TOKEN>`.
// Without a token set, the endpoint refuses all traffic rather than exposing your memory.
import { timingSafeEqual } from "node:crypto";

export function authorize(req) {
  const expected = process.env.ACMI_MCP_TOKEN;
  if (!expected) return { ok: false, status: 500, error: "Server not configured: set ACMI_MCP_TOKEN." };
  const header = req.headers.authorization || "";
  const given = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false, status: 401, error: "Unauthorized" };
  return { ok: true };
}
