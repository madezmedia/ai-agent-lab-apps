import { useMemo, useState } from "react";
import { AppShell } from "@madez/whop-shared/ui";
import { PERSONA, replyTo } from "#/persona";

type Msg = { role: "you" | "them"; text: string };

export function PersonaChat() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(() => [{ role: "them", text: PERSONA.welcome }]);
  const historyKey = useMemo(() => `persona-chat:${PERSONA.id}`, []);
  function send() {
    const clean = text.trim();
    if (!clean) return;
    const next: Msg[] = [...msgs, { role: "you", text: clean }, { role: "them", text: replyTo(clean) }];
    setMsgs(next);
    setText("");
    try { sessionStorage.setItem(historyKey, JSON.stringify(next.slice(-20))); } catch { /* ignore */ }
  }
  return (
    <AppShell kicker={PERSONA.kicker} title={PERSONA.title} lede={PERSONA.lede}>
      <p className="lab-card" style={{ marginBottom: "1rem" }}>{PERSONA.disclosure}</p>
      <ol className="lab-steps">
        {msgs.map((m, i) => (
          <li key={i} className={m.role === "them" ? "lab-step is-ready" : "lab-step"}>
            <span className="lab-step-index">{m.role === "them" ? PERSONA.name[0] : "Y"}</span>
            <div>
              <p className="lab-step-status">{m.role === "them" ? PERSONA.name : "You"}</p>
              <p>{m.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <form className="lab-card" style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }} onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label htmlFor="say">Message</label>
        <textarea id="say" rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder={`Say something to ${PERSONA.name}`} />
        <button type="submit">Send</button>
      </form>
    </AppShell>
  );
}
