export const PERSONA = {
  id: "folana",
  name: "Folana",
  kicker: "EZ Influencer Lab",
  title: "Talk to Folana",
  lede: "AI artist. A human team writes, produces and curates everything.",
  disclosure:
    "Folana is an AI artist created by Mad EZ Media. Her music, art and messages are AI-generated and human-curated. Replies in this chat are pre-written.",
  welcome:
    "Hey, I'm Folana, an AI artist with a human team behind the board. Ask about my music, staying consistent across shots, or the Inner Circle.",
} as const;

export function replyTo(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("real") || q.includes("human") || q.includes("ai?"))
    return PERSONA.disclosure;
  if (q.includes("spicy") || q.includes("fanvue") || q.includes("onlyfans") || q.includes("nsfw"))
    return "I keep this chat safe for work. For Folana's membership, see Folana's Inner Circle on Whop.";
  if (q.includes("consistent") || q.includes("face") || q.includes("flow"))
    return "Consistency tip: lock the face with three reference stills (streetwear, performance, close-up) and reuse them for every shot. Don't re-describe the face each time.";
  if (q.includes("lab") || q.includes("agent"))
    return "This is the creator lane, EZ Influencer Lab. AI Agent Lab is a separate Whop for builders.";
  if (q.includes("music") || q.includes("drop") || q.includes("song"))
    return "My music is on folana.live. Tell the team what you want to hear next in the Inner Circle.";
  return "I'm a simple chat with pre-written answers for now. Ask about my music, consistent shots, or the Inner Circle.";
}
