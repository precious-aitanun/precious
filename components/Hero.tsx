import PhoneFrame from "./PhoneFrame";
import Reveal from "./Reveal";
import type { AppEntry } from "@/config/apps";

export default function Hero({ app }: { app: AppEntry }) {
  const latest = app.versions[0];

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {app.badge}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[3.6rem]">
              {app.tagline}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              {app.shortDescription}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#download"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-display text-[15px] font-semibold text-[#12162A] transition-all hover:bg-accent-strong hover:shadow-[0_0_0_6px_rgb(var(--accent-rgb)/0.15)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 1.5V10.5M8 10.5L4.5 7M8 10.5L11.5 7M2 13.5H14"
                    stroke="#12162A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download APK
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3.5 font-display text-[15px] font-medium text-ink transition-colors hover:border-accent/50 hover:bg-surface"
              >
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-5 font-mono text-xs text-muted">
              v{latest.version} · Android {app.minAndroidVersion}+ · Direct install
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto">
          <div className="absolute inset-0 -z-10 bg-glow-accent blur-2xl" />
          <div className="animate-float" style={{ ["--tilt" as string]: "-4deg" }}>
            <PhoneFrame
              src={app.screenshots[0].src}
              alt={app.screenshots[0].alt}
              priority
              className="mx-auto"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
