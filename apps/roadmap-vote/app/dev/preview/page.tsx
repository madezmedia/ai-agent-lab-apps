import { RoadmapBoard } from "@/components/roadmap-board";
import { notFound } from "next/navigation";

export default function PreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <RoadmapBoard />;
}
