// POST /api/mcp: remote MCP endpoint (Streamable HTTP, stateless: one server per request).
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { buildServer } from "../lib/server.js";
import { authorize } from "../lib/auth.js";

export default async function handler(req, res) {
  const auth = authorize(req);
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error });

  if (req.method !== "POST") {
    // Stateless mode has no server-initiated stream or session to delete.
    return res.status(405).setHeader("Allow", "POST").json({ error: "Method not allowed" });
  }

  const server = buildServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  res.on("close", () => {
    transport.close();
    server.close();
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}
