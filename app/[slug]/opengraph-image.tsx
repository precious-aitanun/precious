import { notFound } from "next/navigation";
import { renderOg, ogSize } from "@/lib/og";
import { apps } from "@/config/apps";

export const size = ogSize;
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();
  return renderOg({ title: app.name, subtitle: app.tagline, accent: app.theme === "teal" ? "#2DD4BF" : "#AEB8F5" });
}
