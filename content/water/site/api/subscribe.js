// POST /api/subscribe: email capture for lytair.com (Off-Grid Water Vault lane only).
// Saves the lead to a Resend audience (RESEND_API_KEY + RESEND_AUDIENCE_ID, set by Mikey in Vercel),
// and/or forwards it to LEAD_WEBHOOK_URL (n8n) with optional x-lead-secret. Never logs the email.
// Form posts get a 303 redirect; fetch/JSON posts get JSON. Bots are dropped silently.
const DISPOSABLE = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com',
  'tempmail.com', 'temp-mail.org', 'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com',
  'maildrop.cc', 'mail.tm', 'uberip.com', 'mailpoof.com', 'throwawaymail.com', 'fakeinbox.com',
]);
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;
const SOURCES = new Set(['bridge_pdf', 'bridge_gate', 'quiz', 'thanks']);
const ANSWERS = new Set(['none', 'days', 'week', 'twoweeks', 'yes', 'roughly', 'no', 'never', 'thought', 'researching', '']);

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

function done(req, res, status, ok, next) {
  const wantsJson = (req.headers['content-type'] || '').includes('application/json');
  if (wantsJson) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok }));
  }
  res.statusCode = 303;
  res.setHeader('Location', next);
  res.setHeader('Cache-Control', 'no-store');
  res.end();
}

async function saveToResend(email) {
  const key = process.env.RESEND_API_KEY, audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) return null;
  const r = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audience)}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  // 409 / "already exists" still means the contact is on the list.
  return r.ok || r.status === 409;
}

// Transactional delivery of what they asked for: the PDF link only, no promotion
// (so no affiliate links here; marketing emails need the mailing address + unsubscribe).
async function sendPlanEmail(email) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const from = process.env.RESEND_FROM || 'Off-Grid Water Vault <plan@madezmedia.com>';
  const pdf = 'https://lytair.com/water/household-water-plan.pdf';
  const text = [
    'Hi there,', '',
    'Here is the free Household Water Plan you requested:', pdf, '',
    'Print it and keep it with your stored water. It covers how much to store (1 gallon per person, per day; 2 weeks at home),',
    'how to store it, and how to make tap water safe during a boil-water notice (CDC and Ready.gov guidance).', '',
    'Off-Grid Water Vault',
    'You received this because you asked for the plan at lytair.com.',
  ].join('\n');
  const html = `<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#12222c;max-width:560px">
    <p>Hi there,</p><p>Here is the free <b>Household Water Plan</b> you requested:</p>
    <p><a href="${pdf}" style="display:inline-block;background:#1c5d86;color:#fff;text-decoration:none;font-weight:bold;padding:12px 18px;border-radius:8px">Download the plan (PDF)</a></p>
    <p>Print it and keep it with your stored water. It covers how much to store (1 gallon per person, per day; 2 weeks at home), how to store it, and how to make tap water safe during a boil-water notice (CDC and Ready.gov guidance).</p>
    <p>Off-Grid Water Vault</p><p style="font-size:12px;color:#4f5d66">You received this because you asked for the plan at lytair.com.</p></div>`;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [email], subject: 'Your free Household Water Plan', text, html }),
  });
  return r.ok;
}

async function forwardToWebhook(lead) {
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) return null;
  const headers = { 'content-type': 'application/json' };
  if (process.env.LEAD_WEBHOOK_SECRET) headers['x-lead-secret'] = process.env.LEAD_WEBHOOK_SECRET;
  const r = await fetch(hook, { method: 'POST', headers, body: JSON.stringify(lead) });
  return r.ok;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.statusCode = 405; res.setHeader('Allow', 'POST'); return res.end(); }
  const body = await readBody(req);
  const email = String(body.email || '').trim().toLowerCase();
  const source = SOURCES.has(body.source) ? body.source : 'bridge_pdf';
  const thanks = '/water/thanks/';
  if (!EMAIL.test(email)) return done(req, res, 400, false, '/water/?error=email#plan');

  const started = Number(body.t || 0);
  const domain = email.split('@')[1] || '';
  const bot = Boolean(body.website) || !started || Date.now() - started < 2500 || DISPOSABLE.has(domain);
  if (bot) return done(req, res, 200, true, thanks);   // looks like success; never saved

  const pick = (v) => (ANSWERS.has(String(v || '')) ? String(v || '') : '');
  const lead = {
    lane: 'water', email, source,
    q1: pick(body.q1), q2: pick(body.q2), q3: pick(body.q3),
    utm_source: String(body.utm_source || '').slice(0, 64),
    utm_campaign: String(body.utm_campaign || '').slice(0, 64),
    utm_content: String(body.utm_content || '').slice(0, 64),
    country: req.headers['x-vercel-ip-country'] || '',
    ts: new Date().toISOString(),
  };

  let saved = false;
  try { const a = await saveToResend(email); if (a) saved = true; } catch {}
  if (saved) { try { await sendPlanEmail(email); } catch {} }
  try { const b = await forwardToWebhook(lead); if (b) saved = true; } catch {}
  return done(req, res, 200, saved, saved ? `${thanks}?ok=1` : `${thanks}?ok=0`);
};
