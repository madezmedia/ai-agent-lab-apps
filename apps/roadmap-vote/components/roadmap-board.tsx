"use client";

import { AppShell } from "@madez/whop-shared/ui";
import { useState } from "react";
import { proposals } from "@/data/proposals";

export function RoadmapBoard() {
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(proposals.map((item) => [item.id, item.votes])),
  );
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  function vote(id: string) {
    if (voted[id]) return;
    setVoted((current) => ({ ...current, [id]: true }));
    setCounts((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

  return (
    <AppShell
      kicker="AI Agent Lab"
      title="Roadmap Vote"
      lede="Proposals for the lab. One vote per card, kept in this browser session."
    >
      <p className="lab-note">Votes are not saved on a server. Refreshing restores the seeded counts.</p>
      <ol className="lab-list lab-list-offset">
        {proposals.map((item) => {
          const mine = Boolean(voted[item.id]);
          const count = counts[item.id] ?? item.votes;
          return (
            <li key={item.id}>
              <article className="lab-card">
                <h2>{item.title}</h2>
                <p>{item.detail}</p>
                <div className="lab-card-actions">
                  <button
                    type="button"
                    className="lab-button lab-button-primary"
                    aria-pressed={mine}
                    disabled={mine}
                    onClick={() => vote(item.id)}
                  >
                    {mine ? "Voted" : "Vote"}
                  </button>
                  <span className="lab-count">
                    {count} {count === 1 ? "vote" : "votes"}
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </AppShell>
  );
}
