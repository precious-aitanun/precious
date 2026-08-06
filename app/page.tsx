import Link from "next/link";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { apps, siteConfig, type AppEntry } from "@/config/apps";

function AppCard({ app }: { app: AppEntry }) {
  const latest = app.versions[0];

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-card transition-colors hover:border-accent/40 sm:p-9">
      <div className="absolute inset-0 -z-10 bg-glow-accent opacity-60" />

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft font-display text-lg font-semibold text-accent">
          {app.name.charAt(0)}
        </span>
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
            {app.badge}
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
            {app.name}
          </h2>
        </div>
      </div>

      <p className="mt-5 text-sm font-medium text-ink">{app.tagline}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{app.shortDescription}</p>

      <ul className="mt-6 space-y-2">
        {app.features.slice(0, 3).map((f) => (
          <li key={f.title} className="flex items-start gap-2 text-sm text-ink">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {f.title}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href={`/${app.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-[#12162A] transition-all hover:bg-accent-strong hover:shadow-[0_0_0_6px_rgb(var(--accent-rgb)/0.15)]"
        >
          Open {app.name}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
              stroke="#12162A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <span className="font-mono text-xs text-muted">
          v{latest.version} · Android {app.minAndroidVersion}+
        </span>
      </div>
    </div>
  );
}

export default function HubPage() {
  const [precious, residents] = apps;

  return (
    <>
      <header className="px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7 text-accent" />
            <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
              {siteConfig.name}
            </span>
          </div>
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-xs text-muted hover:text-ink">
            {siteConfig.contactEmail}
          </a>
        </div>
      </header>

      <main className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-2xl pt-10 text-center sm:pt-16">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                Two apps, one focus
              </span>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {siteConfig.description}
              </h1>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal delay={80}>
              <AppCard app={precious} />
            </Reveal>

            <Reveal delay={160} className="theme-teal">
              <AppCard app={residents} />
            </Reveal>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/60 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6 text-accent" />
            <span className="font-display text-sm font-semibold text-ink">{siteConfig.name}</span>
          </div>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Independent study &amp; duty
            resources, not affiliated with any university, hospital, or examination board.
          </p>
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-xs text-muted hover:text-ink">
            {siteConfig.contactEmail}
          </a>
        </div>
      </footer>
    </>
  );
}
