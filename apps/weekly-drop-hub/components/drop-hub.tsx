"use client";

import { AppShell } from "@madez/whop-shared/ui";
import { useMemo, useState } from "react";
import {
  DROP_FILTERS,
  DROP_TYPE_LABEL,
  drops,
  filterDrops,
  formatDropDate,
  groupDrops,
  type Drop,
  type DropFilter,
} from "@/data/drops";

export function DropHub() {
  const [filter, setFilter] = useState<DropFilter>("all");
  const groups = useMemo(() => groupDrops(filterDrops(drops, filter)), [filter]);

  return (
    <AppShell
      kicker="AI Agent Lab"
      title="Weekly Drop Hub"
      lede="Tuesday live builds and Friday skill drops, kept as a dated archive."
    >
      <div className="lab-filters" role="toolbar" aria-label="Filter drops">
        {DROP_FILTERS.map((item) => {
          const selected = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={selected ? "lab-chip is-active" : "lab-chip"}
              aria-pressed={selected}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {groups.length === 0 ? (
        <p className="lab-empty">No drops in this category yet.</p>
      ) : (
        groups.map((group) => (
          <section key={group.key} className="lab-month" aria-labelledby={`month-${group.key}`}>
            <h2 id={`month-${group.key}`}>{group.label}</h2>
            <ol className="lab-list">
              {group.drops.map((drop) => (
                <li key={drop.id}>
                  <DropCard drop={drop} />
                </li>
              ))}
            </ol>
          </section>
        ))
      )}
    </AppShell>
  );
}

function DropCard({ drop }: { drop: Drop }) {
  const date = formatDropDate(drop.date);
  const badgeClass =
    drop.type === "tuesday-live" ? "lab-badge lab-badge-tuesday" : "lab-badge lab-badge-friday";

  return (
    <article className="lab-card">
      <div className="lab-card-top">
        <p className="lab-date">
          <strong>
            {date.month} {date.day}
          </strong>
          <span>{drop.date}</span>
        </p>
        <span className={badgeClass}>{DROP_TYPE_LABEL[drop.type]}</span>
      </div>
      <h2>{drop.title}</h2>
      <p>{drop.description}</p>
      <div className="lab-card-actions">
        <a className="lab-button lab-button-primary" href={drop.downloadHref} download>
          Download
        </a>
        <a className="lab-button" href={drop.linkHref} target="_blank" rel="noopener noreferrer">
          Open notes
        </a>
      </div>
    </article>
  );
}
