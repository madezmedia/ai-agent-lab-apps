export type Proposal = {
  id: string;
  title: string;
  detail: string;
  votes: number;
};

export const proposals: Proposal[] = [
  {
    id: "prompt-library",
    title: "Shared prompt library",
    detail: "Keep the prompts from Tuesday live builds in one place members can copy.",
    votes: 18,
  },
  {
    id: "office-hours",
    title: "Office hours after live builds",
    detail: "Hold a short queue after each Tuesday session for parked inbox items.",
    votes: 12,
  },
  {
    id: "eval-scores",
    title: "Eval scores on Friday skills",
    detail: "Show the rubric result next to each skill drop before it is called done.",
    votes: 9,
  },
  {
    id: "member-profiles",
    title: "Member-submitted agent cards",
    detail: "Let a build earn a catalog card after the Forum post and the notes exist.",
    votes: 7,
  },
];
