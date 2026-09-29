// Builds email-safe HTML (tables + inline styles) for the Agent Lab blasts.
// Copy source of truth: agent-lab-email-blasts-v1.md. Run: node content/emails/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'html');
fs.mkdirSync(out, { recursive: true });

const ASSETS = 'https://acmi-5min.vercel.app';
const LAB = (id) =>
  `https://whop.com/ai-automation-tools/ai-agent-lab-c1/?utm_source=email&utm_medium=blast&utm_campaign=agentlab-launch&utm_content=${id}`;
const OFFER = '$1 for 3 days, then $39/month. Cancel anytime. 7-day money-back guarantee on your first $39.';

const C = { bg: '#07070a', panel: '#111117', line: '#2a2a33', text: '#f4f4f7', muted: '#a6a6b0', a1: '#ff5a1f', a2: '#ff2d55' };
const FONT = "Helvetica, Arial, sans-serif";

const p = (html) => `<p style="margin:0 0 16px;font:16px/1.6 ${FONT};color:${C.text};">${html}</p>`;
const h = (html) => `<h1 style="margin:0 0 18px;font:800 30px/1.15 ${FONT};color:${C.text};letter-spacing:-0.5px;">${html}</h1>`;
const accent = (t) => `<span style="color:${C.a1};">${t}</span>`;
const list = (items) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;">${items
    .map(
      (i) => `<tr><td valign="top" style="padding:4px 12px 4px 0;"><div style="width:10px;height:10px;margin-top:7px;border-radius:3px;background:${C.a1};background-image:linear-gradient(135deg,${C.a1},${C.a2});"></div></td><td style="padding:4px 0;font:16px/1.6 ${FONT};color:${C.text};">${i}</td></tr>`,
    )
    .join('')}</table>`;
const box = (html) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;"><tr><td style="background:${C.panel};border:1px solid ${C.line};border-left:3px solid ${C.a1};border-radius:10px;padding:16px 18px;font:15px/1.6 ${FONT};color:${C.text};">${html}</td></tr></table>`;
const code = (t) => `<span style="font-family:Menlo,Consolas,monospace;font-size:14px;color:#ffd2c2;">${t}</span>`;
const button = (label, href) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 22px;"><tr><td bgcolor="${C.a1}" style="border-radius:12px;background:${C.a1};background-image:linear-gradient(90deg,${C.a1},${C.a2});"><a href="${href}" style="display:inline-block;padding:15px 26px;font:700 17px/1 ${FONT};color:#0b0b0f;text-decoration:none;border-radius:12px;">${label}</a></td></tr></table>`;
const offer = () => `<p style="margin:-10px 0 20px;font:13px/1.5 ${FONT};color:${C.muted};">${OFFER}</p>`;
const sign = `<p style="margin:8px 0 0;font:16px/1.6 ${FONT};color:${C.text};">— Mikey</p>`;
const ps = (html) => `<p style="margin:22px 0 0;padding-top:16px;border-top:1px solid ${C.line};font:14px/1.6 ${FONT};color:${C.muted};">${html}</p>`;

function wrap({ subject, preview, hero, heroAlt, body }) {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${subject}</title>
<style>
  @media (max-width:620px){ .container{width:100% !important;} .px{padding-left:20px !important;padding-right:20px !important;} }
  a{color:${C.a1};}
</style>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg};">${preview}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background:${C.bg};">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
    <tr><td class="px" style="padding:0 32px 22px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="padding-right:12px;"><img src="${ASSETS}/brand/03-avatar-monogram.png" width="40" height="40" alt="Mad EZ Media" style="display:block;border-radius:50%;border:0;"></td>
        <td style="font:800 12px/1.3 ${FONT};letter-spacing:2px;color:${C.muted};">MAD EZ MEDIA<br><span style="color:${C.a1};">AI AGENT LAB</span></td>
      </tr></table>
    </td></tr>
    ${hero ? `<tr><td class="px" style="padding:0 32px 26px;"><img src="${ASSETS}${hero}" width="536" alt="${heroAlt}" style="display:block;width:100%;max-width:536px;height:auto;border:1px solid ${C.line};border-radius:14px;"></td></tr>` : ''}
    <tr><td class="px" bgcolor="${C.bg}" style="padding:0 32px;">${body}</td></tr>
    <tr><td class="px" style="padding:34px 32px 0;">
      <div style="height:3px;border-radius:3px;background:${C.a1};background-image:linear-gradient(90deg,${C.a1},${C.a2});"></div>
      <p style="margin:18px 0 0;font:12px/1.6 ${FONT};color:${C.muted};">
        You're getting this because you joined a Mad EZ Media product on Whop.<br>
        <a href="{{unsubscribe_url}}" style="color:${C.muted};text-decoration:underline;">Unsubscribe</a> · Mad EZ Media Partners LLC · [MAILING ADDRESS]
      </p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>
`;
}

const EMAILS = [
  {
    id: 'b1-drop-01-live',
    subject: 'Your AI agent team, mapped',
    preview: 'Drop #1 of The Mad EZ Guide is up. First agent in about 30 minutes.',
    hero: '/storefront/05-drop-01.png',
    heroAlt: 'Drop #1: Your AI Agent Team, The Map',
    body:
      p('Hey [first name],') +
      h(`Your AI agent team, ${accent('mapped.')}`) +
      p('I run my business with a team of AI agents: a chief of staff that hands out the work, personal agents, one that runs on a server all night, and coding agents. The part that makes it work isn\'t the agents. It\'s that they <b>share one memory</b>, so each one knows what the others did yesterday.') +
      p('Today I published the map of that whole setup: <b>Drop #1 of The Mad EZ Guide, "Your AI Agent Team: The Map."</b> It\'s inside AI Agent Lab.') +
      p('<b>In about 30 minutes you\'ll:</b>') +
      list(['see how the team is laid out and who does what', 'give your first agent a memory (free, open-source tools)', 'close the chat, open a new one, and watch it pick up where it left off']) +
      p('You get Drop #1 now, a new build every week, the Starter Kit files, and the member chat and forum.') +
      button('Start AI Agent Lab for $1 →', LAB('b1')) +
      offer() +
      p('Tomorrow (Tue) at 2pm ET I\'m building live. More on that in the morning.') +
      sign +
      ps('P.S. Just want the memory piece on its own? It\'s free and open source: <a href="https://github.com/madezmedia/acmi" style="color:#ff5a1f;">github.com/madezmedia/acmi</a>'),
  },
  {
    id: 'b2-live-build',
    subject: 'Live at 2pm ET: building an agent team',
    preview: "Bring a question. I'll build it on screen.",
    hero: '/storefront/01-hero.png',
    heroAlt: 'Build an AI agent team that remembers',
    body:
      p('[first name], quick one.') +
      h(`Live today at ${accent('2pm ET.')}`) +
      p('I\'m building an AI agent team that shares one memory, from a blank setup to agents that know what the others did.') +
      p('Bring the thing you want your agents to do. I\'ll take questions as I go.') +
      box('<b>[VERSION 1, members only]</b> It\'s inside AI Agent Lab. Not in yet? Start for $1 and you\'re in for today\'s build and Drop #1.<br><b>[VERSION 2, open to all]</b> Swap the button link for [LIVE LINK]. Delete this box before sending.') +
      button('Join for $1 and watch live →', LAB('b2')) +
      offer() +
      p('See you at 2.') +
      sign,
  },
  {
    id: 'b3-five-minute-fix',
    subject: "Your AI forgets everything. Here's the fix.",
    preview: 'One shared memory for Claude, Cursor and the rest. Free.',
    hero: '/storefront/03-before-after.png',
    heroAlt: 'Without shared memory vs with shared memory',
    body:
      p('[first name],') +
      h(`Your AI forgets everything. ${accent("Here's the fix.")}`) +
      p('Every time you open a new AI chat, you start over. You re-explain the project, the decisions, and what you tried yesterday.') +
      p('The fix I use is simple. Every agent gets three slots of memory:') +
      list(['<b>Profile:</b> who it is (role, settings)', '<b>Signals:</b> what\'s true right now (status, blockers)', '<b>Timeline:</b> what happened, in order']) +
      p('Agents read these when a session starts and write to them as they work. That\'s all it takes to go from "new chat, who are you?" to "picking up where we left off."') +
      p('The tool is free and open source, and it works with Claude Code, Claude Desktop, Cursor, Cline and Windsurf: <a href="https://github.com/madezmedia/acmi" style="color:#ff5a1f;">github.com/madezmedia/acmi</a>') +
      p('If you\'d rather have me walk you through it, and then add a chief of staff, always-on agents and coding agents on top, that\'s what <b>AI Agent Lab</b> is: one build a week.') +
      button('Try AI Agent Lab for $1 →', LAB('b3')) +
      offer() +
      sign,
  },
  {
    id: 't0-welcome',
    subject: "You're in. Start here.",
    preview: 'Your first agent that remembers, in about 30 minutes.',
    hero: '/storefront/05-drop-01.png',
    heroAlt: 'Drop #1: Your AI Agent Team, The Map',
    body:
      p('Hey [first name], welcome to AI Agent Lab. Mikey here.') +
      h(`Start ${accent('here.')}`) +
      p('<b>Open Drop #1, "Your AI Agent Team: The Map."</b> Watch the walkthrough, then do the 5 steps in "Do this today." The last step is the fun one: you open a brand-new chat and your agent still remembers what it was working on.') +
      button('Open Drop #1 →', '[DROP LINK]') +
      p('<b>Also in the Lab:</b> the Starter Kit files, the member chat, and the forum. Post your first agent there when it\'s working.') +
      p('Stuck on a step? Reply to this email with a screenshot. I read every one.') +
      sign +
      ps('While Drop #1 is still hidden, use T0-alt from the copy file: "goes live Monday, Sep 28" and point the button at the Starter Kit files.'),
  },
  {
    id: 't1-did-it-remember',
    subject: 'Did your agent remember?',
    preview: 'The 30-second test, and where people get stuck.',
    body:
      p('[first name], quick check-in.') +
      h(`Did your agent ${accent('remember?')}`) +
      p('The test that matters: open a <b>new</b> chat and ask your agent:') +
      box(code('Bootstrap agent:my-first-agent from ACMI and tell me what it was doing.')) +
      p('If it answers "learning ACMI," it worked. 🎉') +
      p('<b>Where people usually get stuck:</b>') +
      list(['The database token was pasted with a space or quote at the end.', "The AI app wasn't restarted after the settings change.", 'The command was run in a different folder than the project.']) +
      button('Back to Drop #1 →', '[DROP LINK]') +
      p("Still stuck? Reply with a screenshot and I'll sort it out.") +
      sign,
  },
  {
    id: 't2-renewal-notice',
    subject: 'Your trial ends tomorrow',
    preview: "Here's what happens next. Either way is fine.",
    body:
      p('[first name], a heads-up so nothing surprises you.') +
      h(`Your trial ends ${accent('tomorrow.')}`) +
      box('If you stay, your AI Agent Lab membership continues at <b>$39/month</b>. Nothing to do.<br><br>If it\'s not for you, cancel before then in Whop: <b>[CANCEL PATH]</b>. No hard feelings.<br><br>Change your mind after the first $39? Ask within 7 days of that payment and I\'ll refund it in full.') +
      p('If you stay, the next build is <b>Drop #2, "Grok Bot as Chief of Staff"</b>: one bot that takes a messy idea and splits it across a whole team of agents.') +
      p('Questions? Just reply.') +
      sign,
  },
  {
    id: 'weekly-drop-template',
    subject: 'Drop #[N]: [drop title]',
    preview: '[one-line outcome]',
    hero: '/brand/catalog/gallery-ai-agent-lab.png',
    heroAlt: 'AI Agent Lab weekly drop',
    body:
      p('[first name],') +
      h(`Drop #[N] is live: ${accent('"[drop title]."')}`) +
      p('<b>This week you\'ll:</b> [outcome in one sentence, from the drop\'s "This week" box]<br><b>Time:</b> about [X] minutes.') +
      button('Open Drop #[N] →', '[DROP LINK]') +
      box('[One line from the drop\'s "Mistakes we already made" section.]') +
      p('Post what you build in the forum. I read every post.') +
      sign +
      ps(`<b>Free members only:</b> Not in the Lab yet? ${OFFER} <a href="${LAB('dN')}" style="color:#ff5a1f;">Start for $1 →</a>`),
  },
];

for (const e of EMAILS) {
  fs.writeFileSync(path.join(out, `${e.id}.html`), wrap(e));
}

// Preview sheet for render.mjs screenshots. Images point at local copies so it renders offline.
const sheet = `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;background:#1b1b22;font-family:${FONT};}
section.panel{width:640px;margin:0;padding:0;background:${C.bg};}
</style></head><body>${EMAILS.map((e) => {
  const html = wrap(e);
  const inner = html.slice(html.indexOf('<body'), html.lastIndexOf('</body>')).replace(/^<body[^>]*>/, '');
  const local = inner
    .replaceAll(`${ASSETS}/storefront/`, '../storefront/png/')
    .replaceAll(`${ASSETS}/brand/catalog/`, '../brand/png/catalog/')
    .replaceAll(`${ASSETS}/brand/`, '../brand/png/');
  return `<section class="panel" id="${e.id}">${local}</section>`;
}).join('')}</body></html>`;
fs.writeFileSync(path.join(here, 'preview.html'), sheet);
console.log(`built ${EMAILS.length} emails -> ${out}`);
