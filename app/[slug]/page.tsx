import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppPage from "@/components/AppPage";
import { apps } from "@/config/apps";
import { videos as videoConfig } from "@/config/videos";
import { resolveVideos } from "@/lib/videos";

// Every app in config/apps.ts gets its own page at /<slug>, built ahead of time.
export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) return {};
  return {
    title: `${app.name}: ${app.tagline}`,
    description: app.shortDescription,
    alternates: { canonical: `/${app.slug}` },
    openGraph: { title: app.name, description: app.shortDescription, url: `/${app.slug}`, type: "website" },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();

  const videos = await resolveVideos(videoConfig[app.slug] ?? []);
  return <AppPage app={app} videos={videos} />;
}
