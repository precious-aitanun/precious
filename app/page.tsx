import Link from "next/link";
import Logo from "@/components/layout/Logo";
import Footer from "@/components/layout/Footer";
import HeroStage from "@/components/hero/HeroStage";
import HeartRate from "@/components/hero/HeartRate";
import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";
import Tilt from "@/components/motion/Tilt";
import Icon from "@/components/ui/Icon";
import { apps, siteConfig, type AppEntry } from "@/config/apps";
import { formatDate } from "@/lib/format";
import { subjectPalette, type SubjectKey } from "@/lib/palette";

function AppCard({ app }: { app: AppEntry }) {
  const latest = app.versions[0];
  return (
    <Tilt max={5} className="h-full">
      <Link
        href={`/${app.slug}`}
        className={`${app.theme === "teal" ? "theme-teal" : ""} group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-bg-raised/90 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-accent/50 sm:p-9`}
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-glow-accent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex items-center justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
            <Logo className="h-8 w-8 text-accent" />
          </span>
          <ul className="flex flex-wrap justify-end gap-2">
            {app.badges.map((b) => (
              <li key={b} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {b}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">{app.name}</h2>
        <p className="mt-3 text-lg font-medium leading-snug text-ink/90">{app.tagline}</p>
        
        <ul className="mt-6 space-y-2.5">
          {app.features.slice(0, 3).map((f) => (
            <li key={f.title} className="flex items-center gap-3 text-[15px] text-ink">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon name={f.icon} className="h-4 w-4" />
              </span>
              {f.title}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
          <span className="btn-primary pointer-events-none">
            Open {app.name}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-sm text-muted">
            v{latest.version}, updated {formatDate(latest.releaseDate)}
          </span>
        </div>
      </Link>
    </Tilt>
  );
}

export default function HomePage() {
  // One node per subject / module across both apps, in each app's own colour.
  const palette = apps.flatMap((app) =>
    app.coverage.items.map((item) => {
      const p = item.color ? subjectPalette[item.color as SubjectKey] : undefined;
      return p?.glow ?? (app.theme === "teal" ? "#2DD4BF" : "#AEB8F5");
    })
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[76rem] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
            <Logo className="h-7 w-7 text-accent" />
            <span className="font-display text-[17px] font-semibold tracking-tight text-ink">{siteConfig.name}</span>
          </Link>
          <a href={`mailto:${siteConfig.contactEmail}`} className="rounded-full border border-border bg-bg/60 px-4 py-2 text-sm text-muted backdrop-blur transition-colors hover:border-white/25 hover:text-ink">
            Contact
          </a>
        </div>
      </header>

      <main>
        <HeroStage palette={palette} accent="#AEB8F5" layout="split" className="min-h-[100svh]">
          <div className="relative mx-auto flex min-h-[100svh] max-w-[76rem] flex-col justify-center px-5 pb-40 pt-28 sm:px-8">
            <SplitHeading
              as="h1"
              eager
              startDelay={80}
              text={siteConfig.description}
              className="max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.6rem]"
            />

            <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
              {apps.map((app, i) => (
                <Reveal key={app.slug} delay={500 + i * 140} variant="rise" className="h-full">
                  <AppCard app={app} />
                </Reveal>
              ))}
            </div>
          </div>
          <HeartRate className="absolute bottom-7 left-5 z-10 sm:left-8 lg:left-[max(2rem,calc((100vw-76rem)/2+2rem))]" />
        </HeroStage>
      </main>

      <Footer />
    </>
  );
}
