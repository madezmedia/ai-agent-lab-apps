export type AgentProfile = {
  id: string;
  name: string;
  role: string;
  summary: string;
  tags: string[];
};

export const agents: AgentProfile[] = [
  {
    id: "research-brief",
    name: "Research Brief",
    role: "Source a question",
    summary: "Turns a question into a short brief where each claim points at a source that was opened.",
    tags: ["research", "writing", "friday skill"],
  },
  {
    id: "repo-scout",
    name: "Repo Scout",
    role: "Map a codebase",
    summary: "Names entry points and the request path before anyone edits a file.",
    tags: ["code", "review", "friday skill"],
  },
  {
    id: "inbox-triage",
    name: "Inbox Triage",
    role: "Sort the queue",
    summary: "Places each incoming note into answer now, ask for a file, or park for office hours.",
    tags: ["ops", "live build"],
  },
  {
    id: "eval-runner",
    name: "Eval Runner",
    role: "Check tool calls",
    summary: "Scores a trace against a rubric: right tool, right arguments, and a stop condition.",
    tags: ["evals", "quality"],
  },
  {
    id: "standup-scribe",
    name: "Standup Scribe",
    role: "Close a session",
    summary: "Turns a live build into three lines: what changed, what broke, and what is next.",
    tags: ["notes", "live build"],
  },
];
