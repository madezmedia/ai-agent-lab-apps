// GET /api/entity?namespace=agent&id=chief-of-staff  → profile + signals + recent timeline (dashboard)
// GET /api/entity?namespace=work                      → ids in the namespace
import { readEntity, listIds } from "../lib/acmi.js";
import { authorize } from "../lib/auth.js";

export default async function handler(req, res) {
  const auth = authorize(req);
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error });
  if (req.method !== "GET") return res.status(405).setHeader("Allow", "GET").json({ error: "Method not allowed" });

  const { namespace, id, limit } = req.query;
  if (!namespace) return res.status(400).json({ error: "namespace is required" });
  try {
    if (!id) return res.status(200).json({ namespace, ids: await listIds(namespace) });
    return res.status(200).json(await readEntity(namespace, id, Math.min(Number(limit) || 30, 200)));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
