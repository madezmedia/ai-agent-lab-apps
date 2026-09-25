import { AppShell } from "@madez/whop-shared/ui";
import { STEP_STATUS_LABEL, steps } from "#/data/steps";

export function Checklist() {
  return (
    <AppShell
      kicker="AI Agent Lab"
      title="Starter Checklist"
      lede="Unlock the path kit, then Files, Forum, and your first build."
    >
      <ol className="lab-steps">
        {steps.map((step, index) => (
          <li key={step.id} className={`lab-step is-${step.status}`}>
            <span className="lab-step-index" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <p className="lab-step-status">{STEP_STATUS_LABEL[step.status]}</p>
              <h2>{step.title}</h2>
              <p>{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </AppShell>
  );
}
