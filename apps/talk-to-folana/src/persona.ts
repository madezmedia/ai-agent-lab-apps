export const PERSONA = {
  id: "folana",
  name: "Folana",
  kicker: "EZ Influencer Lab",
  title: "Talk to Folana",
  lede: "AI artist. A human team writes, produces, and ships. I remember the last thing you told me in this tab.",
  disclosure: "Folana is an AI artist created by Mad EZ Media. Music, art, and messages are AI-generated and human-curated.",
  welcome:
    "Hey. I am Folana — AI artist, human team behind the board. Ask about drops, Flow ingredients, or a clip idea. I will not pretend to be a real person.",
} as const;

export function replyTo(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("real") || q.includes("human"))
    return PERSONA.disclosure + " Ask me about a song or a shot list.";
  if (q.includes("flow") || q.includes("consistent"))
    return "Lock me as a Flow Ingredient (@Folana) with three stills: streetwear, performance, intimate. Do not re-describe the face each take. Scenebuilder only assembles after the shots match.";
  if (q.includes("spicy") || q.includes("fanvue") || q.includes("onlyfans"))
    return "Spicy cuts stay on Fanvue / Inner Circle. Facebook music groups get the SFW 15–20s hook plus the disclosure line.";
  if (q.includes("lab") || q.includes("agent") || q.includes("$39"))
    return "This room is the creator lane. Agent Lab is a different Whop (builders + memory). Same owner, different product.";
  if (q.includes("music") || q.includes("drop") || q.includes("song"))
    return "Music lives on folana.live. Next public move is a SFW hook + Friday cover. Tell me the mood and I will sketch a 4-clip shot list.";
  return "Got it. Give me a mood, a platform (FB / Fanvue / Whop), and whether the clip is SFW. I will answer as Folana — AI, disclosed.";
}
