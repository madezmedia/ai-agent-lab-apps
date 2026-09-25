import { Catalog } from "@/components/catalog";
import { notFound } from "next/navigation";

export default function PreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Catalog />;
}
