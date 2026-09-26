export type StepStatus = "current" | "next" | "later";

export type Step = {
  id: string;
  title: string;
  status: StepStatus;
  detail: string;
};

export const STEP_STATUS_LABEL: Record<StepStatus, string> = {
  current: "Start here",
  next: "Up next",
  later: "After that",
};

export const steps: Step[] = [
  {
    id: "kit",
    title: "Unlock the path kit",
    status: "current",
    detail:
      "Start here. The path kit is the map for week one: what to open, what to ignore, and the shape of a first agent.",
  },
  {
    id: "files",
    title: "Open Files",
    status: "next",
    detail:
      "Grab the kit from the product Files app. Keep the filenames as they are so later drops line up with this checklist.",
  },
  {
    id: "forum",
    title: "Post in the Forum",
    status: "later",
    detail:
      "Tell the lab what you are building. One post is enough: the job, the tool you will use, and the output you want.",
  },
  {
    id: "build",
    title: "Ship your first build",
    status: "later",
    detail:
      "Run the agent on a real task, save the notes, and bring them to the next Tuesday live build.",
  },
];
