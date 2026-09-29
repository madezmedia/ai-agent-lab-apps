// POST /api/subscribe: one-field email capture for the /map prelander.
// Forwards clean leads to LEAD_WEBHOOK_URL (the fleet's n8n webhook) and redirects to /map/thanks/.
// Bots (honeypot filled, submitted in under 2s, disposable domain) are redirected too, but never forwarded.
const DISPOSABLE = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com',
  'tempmail.com', 'temp-mail.org', 'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com',
  'maildrop.cc', 'mail.tm', 'uberip.com', 'mailpoof.com', 'throwawaymail.com', 'fakeinbox.com',
]);
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 4096) req.destroy(); });
    req.on('end', () => {
      const type = req.headers['content-type'] || '';
      if (type.includes('application/json')) { try { return resolve(JSON.parse(raw)); } catch { return resolve({}); } }
      resolve(Object.fromEntries(new URLSearchParams(raw)));
    });
  });
}

function redirect(res, location) {
  res.statusCode = 303;
  res.setHeader('Location', location);
  res.setHeader('Cache-Control', 'no-store');
  res.end();
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.statusCode = 405; res.setHeader('Allow', 'POST'); return res.end(); }
  const body = await readBody(req);
  const email = String(body.email || '').trim().toLowerCase();
  const started = Number(body.t || 0);
  const domain = email.split('@')[1] || '';

  if (!EMAIL.test(email)) return redirect(res, '/map/?error=email');

  const bot = Boolean(body.website) || !started || Date.now() - started < 2000 || DISPOSABLE.has(domain);
  if (bot) return redirect(res, '/map/thanks/');

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) return redirect(res, '/map/?error=setup');

  const lead = {
    email,
    source: 'acmi-5min/map',
    utm_source: String(body.utm_source || '').slice(0, 64),
    utm_campaign: String(body.utm_campaign || '').slice(0, 64),
    utm_content: String(body.utm_content || '').slice(0, 64),
    country: req.headers['x-vercel-ip-country'] || '',
    user_agent: String(req.headers['user-agent'] || '').slice(0, 200),
    ts: new Date().toISOString(),
  };
  try {
    const headers = { 'content-type': 'application/json' };
    if (process.env.LEAD_WEBHOOK_SECRET) headers['x-lead-secret'] = process.env.LEAD_WEBHOOK_SECRET;
    const r = await fetch(hook, { method: 'POST', headers, body: JSON.stringify(lead) });
    if (!r.ok) return redirect(res, '/map/?error=setup');
  } catch {
    return redirect(res, '/map/?error=setup');
  }
  return redirect(res, '/map/thanks/?ok=1');
};
