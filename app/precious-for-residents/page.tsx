import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatStrip from "@/components/StatStrip";
import Features from "@/components/Features";
import Screenshots from "@/components/Screenshots";
import HowItWorks from "@/components/HowItWorks";
import Coverage from "@/components/Coverage";
import Download from "@/components/Download";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { apps } from "@/config/apps";
import { getApkInfos } from "@/lib/apk";

const app = apps.find((a) => a.slug === "precious-for-residents")!;
const otherApp = apps.find((a) => a.slug !== "precious-for-residents")!;

export const metadata: Metadata = {
  title: `${app.name} — ${app.tagline}`,
  description: app.shortDescription,
  openGraph: {
    title: `${app.name} — ${app.tagline}`,
    description: app.shortDescription,
    type: "website",
  },
};

export default function PreciousForResidentsPage() {
  const apkInfos = getApkInfos(app.versions);

  return (
    <div className="theme-teal">
      <Navbar app={app} otherApp={{ slug: otherApp.slug, name: otherApp.name }} />
      <main>
        <Hero app={app} />
        <StatStrip app={app} />
        <Features app={app} />
        <Screenshots app={app} />
        <HowItWorks app={app} />
        <Coverage
          sectionLabel={app.coverage.sectionLabel}
          title={app.coverage.title}
          subtitle={app.coverage.subtitle}
          items={app.coverage.items}
        />
        <Download app={app} apkInfos={apkInfos} />
        <FAQ app={app} />
      </main>
      <Footer app={app} />
    </div>
  );
}
