import { createFileRoute, notFound } from "@tanstack/react-router";
import { PersonaChat } from "#/components/persona-chat";
export const Route = createFileRoute("/dev/preview")({
  loader: () => { if (!import.meta.env.DEV) throw notFound(); },
  component: PersonaChat,
});
