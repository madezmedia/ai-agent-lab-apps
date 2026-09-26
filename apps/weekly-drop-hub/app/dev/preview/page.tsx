import { DropHub } from "@/components/drop-hub";
import { notFound } from "next/navigation";

export default function PreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <DropHub />;
}
