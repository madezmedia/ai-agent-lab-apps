import { createFileRoute, notFound } from "@tanstack/react-router";
import { Catalog } from "@/components/catalog";

export const Route = createFileRoute("/dev/preview")({
  loader: () => {
    if (!import.meta.env.DEV) {
      throw notFound();
    }
  },
  component: Catalog,
});
