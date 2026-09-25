import { createFileRoute, notFound } from "@tanstack/react-router";
import { Checklist } from "#/components/checklist";

export const Route = createFileRoute("/dev/preview")({
  loader: () => {
    // Vite replaces this with false in `vite build`, so production returns 404.
    // The worker does not see the parent shell's process.env.
    if (!import.meta.env.DEV) {
      throw notFound();
    }
  },
  component: Checklist,
});
