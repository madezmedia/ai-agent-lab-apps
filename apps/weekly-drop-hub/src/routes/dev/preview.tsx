import { createFileRoute, notFound } from "@tanstack/react-router";
import { DropHub } from "@/components/drop-hub";

export const Route = createFileRoute("/dev/preview")({
  loader: () => {
    if (!import.meta.env.DEV) {
      throw notFound();
    }
  },
  component: DropHub,
});
