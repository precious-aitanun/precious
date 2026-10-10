import Navbar, { type NavLink } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import StatStrip from "@/components/sections/StatStrip";
import Videos from "@/components/sections/Videos";
import Features from "@/components/sections/Features";
import Screenshots from "@/components/sections/Screenshots";
import HowItWorks from "@/components/sections/HowItWorks";
import Coverage from "@/components/sections/Coverage";
import Download from "@/components/sections/Download";
import FAQ from "@/components/sections/FAQ";
import { apps, type AppEntry } from "@/config/apps";
import { getApkInfos } from "@/lib/apk";
import type { Video } from "@/lib/videos";

/**
 * One page template for every app. Sections that have nothing to show
 * (no videos, no screenshots) drop out, and so do their menu links.
 */
export default function AppPage({ app, videos }: { app: AppEntry; videos: Video[] }) {
  const apkInfos = getApkInfos(app.versions);
  const other = apps.find((a) => a.slug !== app.slug);

  const links: NavLink[] = [
    videos.length > 0 ? { href: "#videos", label: "Videos" } : null,
    { href: "#features", label: "Features" },
    app.screenshots.length > 0 ? { href: "#screenshots", label: "Screenshots" } : null,
    { href: "#how-it-works", label: "How it works" },
    { href: "#coverage", label: app.slug === "precious" ? "Subjects" : "Modules" },
    { href: "#faq", label: "FAQ" },
  ].filter((l): l is NavLink => !!l);

  return (
    <div className={app.theme === "teal" ? "theme-teal" : ""}>
      <Navbar appName={app.name} links={links} otherApp={other && { slug: other.slug, name: other.name }} />
      <main>
        <Hero app={app} hasVideos={videos.length > 0} downloadReady={apkInfos[0].available} />
        <div className="pt-2">
          <StatStrip app={app} />
        </div>
        <Videos videos={videos} appName={app.name} />
        <Features app={app} />
        <Screenshots app={app} />
        <HowItWorks app={app} />
        <Coverage app={app} />
        <Download app={app} apkInfos={apkInfos} />
        <FAQ items={app.faq} />
      </main>
      <Footer currentSlug={app.slug} />
    </div>
  );
}
