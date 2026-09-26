// Builds the ACMI MCP server: the tools your agents call over HTTP.
// Tool names match the local `@madezmedia/acmi-mcp` server where they overlap, so prompts
// from the Agent Lab drops work unchanged.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getAcmi, entityId, readEntity, listIds, newCorrelationId, TENANT } from "./acmi.js";

const ok = (data) => ({ content: [{ type: "text", text: JSON.stringify(data, null, 2) }] });
const fail = (err) => ({ isError: true, content: [{ type: "text", text: `Error: ${err.message ?? err}` }] });

// Tool handlers return errors as tool results (not thrown) so the calling agent can read and fix them.
const safe = (fn) => async (args) => {
  try {
    return ok(await fn(args));
  } catch (err) {
    return fail(err);
  }
};

const parseJson = (text, field) => {
  try {
    const value = JSON.parse(text);
    if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("not an object");
    return value;
  } catch {
    throw new Error(`${field} must be a JSON object string, e.g. '{"role":"assistant"}'`);
  }
};

const ns = z.string().min(1).describe('Namespace, e.g. "agent", "user", "thread", "work"');
const id = z.string().min(1).describe('Entity id within the namespace, e.g. "chief-of-staff"');

async function appendEvent(namespace, entity, { source, summary, kind, correlationId, parentCorrelationId }) {
  const event = {
    source,
    kind: kind || "note",
    correlationId: correlationId || newCorrelationId(kind || "note"),
    summary,
    ...(parentCorrelationId ? { payload: { parentCorrelationId } } : {}),
  };
  return getAcmi().timeline.append(entityId(namespace, entity), event);
}

async function mergeSignals(namespace, entity, signalsJson) {
  const acmi = getAcmi();
  const eid = entityId(namespace, entity);
  const updates = parseJson(signalsJson, "signals");
  for (const [key, value] of Object.entries(updates)) await acmi.signals.set(eid, key, value);
  return acmi.signals.all(eid);
}

export function buildServer() {
  const server = new McpServer({ name: "acmi-hosted", version: "1.0.0" });
  const acmi = () => getAcmi();

  // ─── Entities ──────────────────────────────────────────────────────────
  server.tool(
    "acmi_get",
    "Read an entity's full context: profile, signals and the most recent timeline events (newest first).",
    { namespace: ns, id, limit: z.number().int().min(1).max(200).optional().describe("Timeline events to return (default 20)") },
    safe(({ namespace, id, limit }) => readEntity(namespace, id, limit ?? 20)),
  );

  server.tool(
    "acmi_profile",
    "Create or update an entity profile. Fields are merged into the existing profile. Include actor_type (agent | human | system | external).",
    { namespace: ns, id, profile: z.string().describe("JSON object string of profile fields") },
    safe(({ namespace, id, profile }) => acmi().profile.merge(entityId(namespace, id), parseJson(profile, "profile"))),
  );

  server.tool(
    "acmi_signal",
    "Set current-state signals on an entity. Each key in the JSON object is merged into the existing signals.",
    { namespace: ns, id, signals: z.string().describe('JSON object string, e.g. \'{"current_task":"learning ACMI"}\'') },
    safe(({ namespace, id, signals }) => mergeSignals(namespace, id, signals)),
  );

  server.tool(
    "acmi_event",
    "Append an event to an entity's timeline. Use the summary format '[kind @recipient] one line'.",
    {
      namespace: ns,
      id,
      source: z.string().min(1).describe('Who wrote it, e.g. "agent:chief-of-staff"'),
      summary: z.string().min(1).max(500),
      kind: z.string().optional().describe('e.g. "spawn", "task-delegation", "handoff-ack", "decision"'),
      correlationId: z.string().optional().describe("camelCase-<msEpoch>; generated if omitted"),
      parentCorrelationId: z.string().optional().describe("correlationId of the event this continues"),
    },
    safe(({ namespace, id, ...event }) => appendEvent(namespace, id, event)),
  );

  server.tool(
    "acmi_list",
    "List entity ids in a namespace (entities that have a profile).",
    { namespace: ns },
    safe(async ({ namespace }) => ({ namespace, ids: await listIds(namespace) })),
  );

  server.tool(
    "acmi_bootstrap",
    "Start-of-session context for an agent: its profile, signals, recent timeline and latest rollup. Call this before acting.",
    { agentId: z.string().min(1).describe('Agent id without the "agent:" prefix'), limit: z.number().int().min(1).max(100).optional() },
    safe(async ({ agentId, limit }) => {
      const ctx = await readEntity("agent", agentId, limit ?? 20);
      return { ...ctx, rollup: ctx.signals?.rollup ?? null };
    }),
  );

  server.tool(
    "acmi_rollup_set",
    "Save an end-of-session rollup for an agent (what shipped, blockers, decisions, next priorities). The next acmi_bootstrap returns it.",
    { agentId: z.string().min(1), rollup: z.string().describe("JSON object string") },
    safe(async ({ agentId, rollup }) => {
      const eid = entityId("agent", agentId);
      await acmi().signals.set(eid, "rollup", { ...parseJson(rollup, "rollup"), savedAt: new Date().toISOString() });
      return { saved: true, agentId };
    }),
  );

  // ─── Work items ────────────────────────────────────────────────────────
  server.tool(
    "acmi_work_create",
    "Create a work item with a title, owner and finish line.",
    { id, profile: z.string().describe('JSON object string, e.g. \'{"title":"...","owner":"chief-of-staff","finish_line":"..."}\'') },
    safe(async ({ id, profile }) => {
      const doc = { status: "open", ...parseJson(profile, "profile") };
      await acmi().profile.set(entityId("work", id), doc);
      await appendEvent("work", id, { source: doc.owner ? `agent:${doc.owner}` : "system", kind: "work-created", summary: `[work-created] ${doc.title ?? id}` });
      return { id, profile: doc };
    }),
  );

  server.tool(
    "acmi_work_event",
    "Log an event on a work item (task-delegation, handoff-ack, work-update, blocker, decision, correction, work-completed).",
    {
      id,
      source: z.string().min(1),
      summary: z.string().min(1).max(500),
      kind: z.string().optional(),
      correlationId: z.string().optional(),
      parentCorrelationId: z.string().optional(),
    },
    safe(({ id, ...event }) => appendEvent("work", id, event)),
  );

  server.tool(
    "acmi_work_signal",
    "Update a work item's signals (status, blockers, gates). Keys are merged.",
    { id, signals: z.string().describe("JSON object string") },
    safe(({ id, signals }) => mergeSignals("work", id, signals)),
  );

  server.tool(
    "acmi_work_get",
    "Read a work item: profile, signals and recent timeline (newest first).",
    { id, limit: z.number().int().min(1).max(200).optional() },
    safe(({ id, limit }) => readEntity("work", id, limit ?? 50)),
  );

  server.tool(
    "acmi_work_list",
    "List all work item ids.",
    {},
    safe(async () => ({ ids: await listIds("work") })),
  );

  server.tool("acmi_whoami", "Show which tenant this endpoint writes to.", {}, safe(async () => ({ tenant: TENANT })));

  return server;
}
