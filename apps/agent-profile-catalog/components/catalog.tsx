"use client";

import { AppShell } from "@madez/whop-shared/ui";
import { useMemo, useState } from "react";
import { agents } from "@/data/agents";

export function Catalog() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return agents;
    return agents.filter((agent) => {
      const haystack = [agent.name, agent.role, agent.summary, ...agent.tags].join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [query]);

  return (
    <AppShell
      kicker="AI Agent Lab"
      title="Agent Profile Catalog"
      lede="Sample agents from the lab. Search by name, role, or tag."
    >
      <label className="lab-search">
        Search agents
        <input
          className="lab-input"
          type="search"
          value={query}
          placeholder="Try research, evals, or scout"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {visible.length === 0 ? (
        <p className="lab-empty">No agents match that search.</p>
      ) : (
        <ol className="lab-list">
          {visible.map((agent) => (
            <li key={agent.id}>
              <article className="lab-card">
                <p className="lab-role">{agent.role}</p>
                <h2>{agent.name}</h2>
                <p>{agent.summary}</p>
                <div className="lab-tags">
                  {agent.tags.map((tag) => (
                    <span key={tag} className="lab-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      )}
    </AppShell>
  );
}
