export const PERSONA = {
  id: "bentley-public",
  name: "Bentley",
  kicker: "AI Agent Lab",
  title: "Talk to Bentley",
  lede: "Lab guide. Ask about drops, the Starter Checklist, Files, the trial, or how shared memory works.",
  disclosure: "Bentley is an AI guide with pre-written answers. It can't see your account or your data.",
  welcome:
    "Hi, I'm Bentley, the Lab guide. Ask about Drop #1, the Starter Checklist, the Files tab, or how ACMI memory works.",
} as const;

export function replyTo(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("checklist") || q.includes("starter"))
    return "The Starter Checklist is a tab in the Lab. The Starter Kit files are in the Files tab. Path: kit → Files → Forum → your first build.";
  if (/\bemails?\b/.test(q) || q.includes("export"))
    return "I can't access member data or export emails. For account questions, message Mikey in the Lab chat.";
  if (q.includes("drop"))
    return "Drop #1, \"Your AI Agent Team: The Map\", takes about 30 minutes and lives in the Courses tab. New drops land weekly.";
  if (q.includes("trial") || q.includes("$1") || q.includes("$39") || q.includes("price") || q.includes("cancel"))
    return "The Lab is $1 for 3 days, then $39/month. Cancel anytime in Whop before the trial ends and you won't be charged the $39.";
  if (q.includes("folana") || q.includes("influencer"))
    return "Folana lives in EZ Influencer Lab, a separate Whop for creators. This room is AI Agent Lab.";
  if (q.includes("memory") || q.includes("acmi"))
    return "ACMI gives every agent three memory slots: Profile (who it is), Signals (what's true now) and Timeline (what happened). Drop #1 walks you through it.";
  return "I can help with the Lab: drops, the Starter Checklist, Files, the trial, or how shared memory works.";
}
