export type DropType = "tuesday-live" | "friday-skill";
export type DropFilter = "all" | DropType;

export type Drop = {
  id: string;
  title: string;
  date: string;
  type: DropType;
  description: string;
  downloadHref: string;
  linkHref: string;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const DROP_TYPE_LABEL: Record<DropType, string> = {
  "tuesday-live": "Tuesday live build",
  "friday-skill": "Friday skill drop",
};

export const DROP_FILTERS: { id: DropFilter; label: string }[] = [
  { id: "all", label: "All drops" },
  { id: "tuesday-live", label: "Tuesday live builds" },
  { id: "friday-skill", label: "Friday skill drops" },
];

export const drops: Drop[] = [
  {
    id: "research-brief",
    title: "Citation-backed research brief",
    date: "2026-09-25",
    type: "friday-skill",
    description:
      "A skill that starts from a member question, gathers sources, and writes a short brief where every claim points at something you opened.",
    downloadHref: "/drops/research-brief.txt",
    linkHref: "/drops/research-brief.txt",
  },
  {
    id: "inbox-triage",
    title: "Inbox triage agent",
    date: "2026-09-22",
    type: "tuesday-live",
    description:
      "Live build of an agent that sorts incoming lab questions into a queue: answer now, ask for a file, or park for the next office hours.",
    downloadHref: "/drops/inbox-triage.txt",
    linkHref: "/drops/inbox-triage.txt",
  },
  {
    id: "eval-harness",
    title: "Eval harness for tool calls",
    date: "2026-09-18",
    type: "friday-skill",
    description:
      "A small rubric for checking whether an agent called the right tool, with the arguments it should have used, before you ship the skill.",
    downloadHref: "/drops/eval-harness.txt",
    linkHref: "/drops/eval-harness.txt",
  },
  {
    id: "experience-shell",
    title: "Whop experience shell",
    date: "2026-09-15",
    type: "tuesday-live",
    description:
      "Walkthrough of the experience route, the access check, and the empty states you should show when a member is outside the product.",
    downloadHref: "/drops/experience-shell.txt",
    linkHref: "/drops/experience-shell.txt",
  },
  {
    id: "repo-scout",
    title: "Repo scout",
    date: "2026-09-11",
    type: "friday-skill",
    description:
      "A skill that maps a repository before you change it: entry points, the path a request takes, and the files you should not touch yet.",
    downloadHref: "/drops/repo-scout.txt",
    linkHref: "/drops/repo-scout.txt",
  },
  {
    id: "standup-pack",
    title: "Operator standup pack",
    date: "2026-09-08",
    type: "tuesday-live",
    description:
      "The prompt pack used on the live build to turn a messy working session into a standup: what changed, what broke, what is next.",
    downloadHref: "/drops/standup-pack.txt",
    linkHref: "/drops/standup-pack.txt",
  },
  {
    id: "onboarding-flow",
    title: "Member onboarding flow",
    date: "2026-08-28",
    type: "friday-skill",
    description:
      "The first-week path from the starter kit through Files and the Forum, written so a new member can follow it without a call.",
    downloadHref: "/drops/onboarding-flow.txt",
    linkHref: "/drops/onboarding-flow.txt",
  },
  {
    id: "lab-setup",
    title: "First-week lab setup",
    date: "2026-08-25",
    type: "tuesday-live",
    description:
      "Live build of the setup pass: local env templates, the Whop dev proxy, and a single command that builds every lab app.",
    downloadHref: "/drops/lab-setup.txt",
    linkHref: "/drops/lab-setup.txt",
  },
];

export function filterDrops(items: Drop[], filter: DropFilter): Drop[] {
  if (filter === "all") return items;
  return items.filter((drop) => drop.type === filter);
}

export function groupDrops(items: Drop[]): { key: string; label: string; drops: Drop[] }[] {
  const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const groups: { key: string; label: string; drops: Drop[] }[] = [];
  for (const drop of sorted) {
    const [year, month] = drop.date.split("-");
    const key = `${year}-${month}`;
    const label = `${MONTHS[Number(month) - 1] ?? month} ${year}`;
    const existing = groups.find((group) => group.key === key);
    if (existing) existing.drops.push(drop);
    else groups.push({ key, label, drops: [drop] });
  }
  return groups;
}

export function formatDropDate(date: string): { month: string; day: string } {
  const [, month, day] = date.split("-");
  return {
    month: SHORT_MONTHS[Number(month) - 1] ?? month ?? "",
    day: String(Number(day)),
  };
}
