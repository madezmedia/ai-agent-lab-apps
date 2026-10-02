// GET /api/stats: counts only (never emails) for the Off-Grid Water Vault list.
// Needs header x-stats-token matching STATS_TOKEN (set in Vercel). Without it: 404.
const crypto = require('crypto');

function same(a, b) {
  const x = Buffer.from(String(a || '')), y = Buffer.from(String(b || ''));
  return x.length === y.length && x.length > 0 && crypto.timingSafeEqual(x, y);
}

async function resend(path) {
  const r = await fetch(`https://api.resend.com${path}`, { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } });
  return r.ok ? r.json() : { error: r.status };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!process.env.STATS_TOKEN || !same(req.headers['x-stats-token'], process.env.STATS_TOKEN)) { res.statusCode = 404; return res.end(); }
  const contacts = await resend(`/audiences/${encodeURIComponent(process.env.RESEND_AUDIENCE_ID || '')}/contacts`);
  const list = Array.isArray(contacts.data) ? contacts.data : [];
  const byDay = {};
  for (const c of list) { const d = String(c.created_at || '').slice(0, 10); byDay[d] = (byDay[d] || 0) + 1; }
  const emails = await resend('/emails?limit=100');
  const sent = (Array.isArray(emails.data) ? emails.data : []).filter((e) => /Water Plan/.test(e.subject || ''));
  const events = {};
  for (const e of sent) events[e.last_event || 'unknown'] = (events[e.last_event || 'unknown'] || 0) + 1;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    contacts: list.length,
    unsubscribed: list.filter((c) => c.unsubscribed).length,
    contacts_by_day: byDay,
    plan_emails_last100: sent.length,
    plan_email_events: events,
    errors: [contacts.error, emails.error].filter(Boolean),
  }));
};
