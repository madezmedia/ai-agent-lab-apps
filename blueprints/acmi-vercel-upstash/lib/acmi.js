// ACMI client + storage helpers shared by the MCP endpoint and the dashboard API.
//
// Keys are written as `acmi:<tenant>:<namespace>:<id>:<slot>`, the same layout the local
// `@madezmedia/acmi-mcp` server uses, so memory created with the local server (Drop #1)
// shows up here too.
import { createAcmi } from "@madezmedia/acmi";
import { UpstashAdapter } from "@madezmedia/acmi/adapters/upstash";
import { InMemoryAdapter } from "@madezmedia/acmi/adapters/in-memory";

export const TENANT = process.env.ACMI_TENANT || "madez";
const PREFIX = `acmi:${TENANT}`;

// Vercel's Upstash integration may inject KV_REST_API_* instead of UPSTASH_REDIS_REST_*.
function upstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

let client;
export function getAcmi() {
  if (client) return client;
  if (process.env.ACMI_ADAPTER === "memory") {
    client = createAcmi(new InMemoryAdapter({ prefix: PREFIX }));
    return client;
  }
  const cfg = upstashConfig();
  if (!cfg) {
    throw new Error("Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL / KV_REST_API_TOKEN).");
  }
  client = createAcmi(new UpstashAdapter({ ...cfg, prefix: PREFIX }));
  return client;
}

/** Test hook: swap in a fresh client (e.g. a new in-memory store per test). */
export function resetAcmi() {
  client = undefined;
}

export const entityId = (namespace, id) => `${namespace}:${id}`;

/** Full context for one entity: profile, all signals, newest timeline events first. */
export async function readEntity(namespace, id, limit = 20) {
  const acmi = getAcmi();
  const eid = entityId(namespace, id);
  const [profile, signals, timeline] = await Promise.all([
    acmi.profile.get(eid),
    acmi.signals.all(eid),
    acmi.timeline.read(eid, { limit, reverse: true }),
  ]);
  return { namespace, id, profile, signals, timeline };
}

/**
 * List ids in a namespace by scanning for profile keys. The SDK has no list call, so this goes
 * to Upstash's REST API directly (SCAN); the in-memory adapter can't be listed.
 */
export async function listIds(namespace, max = 200) {
  const cfg = upstashConfig();
  if (process.env.ACMI_ADAPTER === "memory" || !cfg) return [];
  const match = `${PREFIX}:${namespace}:*:profile`;
  const ids = new Set();
  let cursor = "0";
  do {
    const res = await fetch(cfg.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["SCAN", cursor, "MATCH", match, "COUNT", "200"]),
    });
    if (!res.ok) throw new Error(`Upstash SCAN failed: ${res.status}`);
    const { result } = await res.json();
    cursor = String(result[0]);
    for (const key of result[1]) ids.add(key.slice(`${PREFIX}:${namespace}:`.length, -":profile".length));
  } while (cursor !== "0" && ids.size < max);
  return [...ids].sort();
}

/** camelCase id + ms epoch, the ACMI correlationId convention. */
export function newCorrelationId(stem = "event") {
  const camel = stem.replace(/[^a-zA-Z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : "")).replace(/^./, (c) => c.toLowerCase());
  return `${camel || "event"}-${Date.now()}`;
}
