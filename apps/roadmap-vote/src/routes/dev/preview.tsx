import { createFileRoute, notFound } from "@tanstack/react-router";
import { RoadmapBoard } from "@/components/roadmap-board";

export const Route = createFileRoute("/dev/preview")({
  loader: () => {
    if (!import.meta.env.DEV) {
      throw notFound();
    }
  },
  component: RoadmapBoard,
});
