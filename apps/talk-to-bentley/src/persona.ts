export const PERSONA = {
  id: "bentley-public",
  name: "Bentley",
  kicker: "AI Agent Lab",
  title: "Talk to Bentley",
  lede: "Lab concierge. I help with drops, the checklist, and shared memory. I do not run fleet QA from this tab.",
  disclosure: "Bentley in this room is a member-facing guide. Internal verification tools stay off this surface.",
  welcome:
    "Bentley — Lab concierge. Ask about Drop #1, the Starter Checklist, Files, or how ACMI memory works. I will not export member emails or run vault jobs from here.",
} as const;

export function replyTo(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("email") || q.includes("export") || q.includes("list"))
    return "Email export is not available in this room. Use the Whop dashboard on the company that owns the list.";
  if (q.includes("checklist") || q.includes("starter"))
    return "Starter Checklist is a member tab. Kit zip lives in Agent Lab Files, not inside the checklist app. Path: kit → Files → Forum → first build.";
  if (q.includes("drop"))
    return "Drop #1 is the Map (~30 min). It stays draft until Mikey smoke-tests and flips it live. Weekly cadence after that.";
  if (q.includes("trial") || q.includes("$1") || q.includes("39"))
    return "Lab is $1 for 3 days, then $39/mo. Cancel before day 3. I will not invent other prices.";
  if (q.includes("folana") || q.includes("influencer"))
    return "Creator lane is EZ Influencer Lab — different Whop. Same owner. Talk to Folana lives there.";
  if (q.includes("memory") || q.includes("acmi"))
    return "ACMI is Profile / Signals / Timeline. Agents share one Redis layout. Starter Kit files are in the Files tab.";
  return "Ask me a Lab how-to. I am the public Bentley, not the fleet verifier.";
}
