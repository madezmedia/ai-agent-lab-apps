// End-to-end test: runs the Vercel handlers on a local HTTP server (in-memory storage) and
// drives them with the real MCP client over Streamable HTTP.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

process.env.ACMI_ADAPTER = "memory";
process.env.ACMI_MCP_TOKEN = "test-token";

const { default: mcpHandler } = await import("../api/mcp.js");
const { default: entityHandler } = await import("../api/entity.js");

// Minimal shim for Vercel's Node helpers (req.body, req.query, res.status().json()).
function vercelify(handler) {
  return async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    req.query = Object.fromEntries(url.searchParams);
    let raw = "";
    for await (const chunk of req) raw += chunk;
    req.body = raw ? JSON.parse(raw) : undefined;
    res.status = (code) => ((res.statusCode = code), res);
    res.json = (obj) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(obj));
      return res;
    };
    await handler(req, res);
  };
}

let server, base;
before(async () => {
  const mcp = vercelify(mcpHandler);
  const entity = vercelify(entityHandler);
  server = http.createServer((req, res) => (req.url.startsWith("/api/mcp") ? mcp(req, res) : entity(req, res)));
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}`;
});
after(() => server.close());

async function connect(token = "test-token") {
  const client = new Client({ name: "test", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(new URL(`${base}/api/mcp`), {
    requestInit: { headers: { Authorization: `Bearer ${token}` } },
  });
  await client.connect(transport);
  return client;
}
const data = (result) => JSON.parse(result.content[0].text);

test("rejects requests without the bearer token", async () => {
  const res = await fetch(`${base}/api/mcp`, { method: "POST", body: "{}" });
  assert.equal(res.status, 401);
  await assert.rejects(connect("wrong-token"));
});

test("Drop #1 flow: profile, event, signal, then a fresh session bootstraps the memory", async () => {
  const a = await connect();
  const tools = (await a.listTools()).tools.map((t) => t.name);
  for (const name of ["acmi_get", "acmi_profile", "acmi_signal", "acmi_event", "acmi_bootstrap", "acmi_work_create"]) {
    assert.ok(tools.includes(name), `missing tool ${name}`);
  }
  await a.callTool({ name: "acmi_profile", arguments: { namespace: "agent", id: "my-first-agent", profile: '{"actor_type":"agent","role":"personal assistant"}' } });
  await a.callTool({ name: "acmi_event", arguments: { namespace: "agent", id: "my-first-agent", source: "agent:my-first-agent", kind: "spawn", summary: "[spawn @me] first agent online" } });
  await a.callTool({ name: "acmi_signal", arguments: { namespace: "agent", id: "my-first-agent", signals: '{"current_task":"learning ACMI"}' } });
  await a.close();

  const b = await connect(); // "new chat"
  const ctx = data(await b.callTool({ name: "acmi_bootstrap", arguments: { agentId: "my-first-agent" } }));
  assert.equal(ctx.signals.current_task, "learning ACMI");
  assert.equal(ctx.profile.role, "personal assistant");
  assert.equal(ctx.timeline[0].kind, "spawn");
  assert.match(ctx.timeline[0].correlationId, /^spawn-\d+$/);
  await b.close();
});

test("Drop #2 flow: work item, delegation, ack, and the dashboard API reads it", async () => {
  const c = await connect();
  await c.callTool({ name: "acmi_work_create", arguments: { id: "newsletter-page", profile: '{"title":"Newsletter landing page","owner":"chief-of-staff","finish_line":"page drafted, not sent"}' } });
  await c.callTool({ name: "acmi_work_event", arguments: { id: "newsletter-page", source: "agent:chief-of-staff", kind: "task-delegation", correlationId: "cosDelegatePage-1", summary: "[task-delegation @builder] draft the page" } });
  await c.callTool({ name: "acmi_work_event", arguments: { id: "newsletter-page", source: "agent:builder", kind: "handoff-ack", parentCorrelationId: "cosDelegatePage-1", summary: "[handoff-ack] drafting" } });
  await c.callTool({ name: "acmi_work_signal", arguments: { id: "newsletter-page", signals: '{"gate":"no sends until Mikey reviews"}' } });
  const work = data(await c.callTool({ name: "acmi_work_get", arguments: { id: "newsletter-page" } }));
  assert.deepEqual(work.timeline.map((e) => e.kind), ["handoff-ack", "task-delegation", "work-created"]);
  assert.equal(work.timeline[0].payload.parentCorrelationId, "cosDelegatePage-1");
  assert.equal(work.signals.gate, "no sends until Mikey reviews");
  await c.close();

  const res = await fetch(`${base}/api/entity?namespace=work&id=newsletter-page`, { headers: { Authorization: "Bearer test-token" } });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).profile.title, "Newsletter landing page");
});

test("bad JSON comes back as a readable tool error, not a crash", async () => {
  const d = await connect();
  const result = await d.callTool({ name: "acmi_signal", arguments: { namespace: "agent", id: "x", signals: "not json" } });
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /must be a JSON object/);
  await d.close();
});
