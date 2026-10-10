import HeroStage from "@/components/hero/HeroStage";
import HeroDevice from "@/components/hero/HeroDevice";
import HeartRate from "@/components/hero/HeartRate";
import SplitHeading from "@/components/motion/SplitHeading";
import Magnetic from "@/components/motion/Magnetic";
import { subjectPalette, type SubjectKey } from "@/lib/palette";
import { androidLabel } from "@/lib/format";
import type { AppEntry, IconName } from "@/config/apps";

const SCENE_VALUES = [82, 61, 74, 48, 36];

const CHIPS: Record<AppEntry["heroScene"], { label: string; icon: IconName }[]> = {
  library: [
    { label: "Works offline", icon: "offline" },
    { label: "Cloud-synced", icon: "sync" },
  ],
  ward: [
    { label: "SBAR sign-out", icon: "sbar" },
    { label: "Shift progress", icon: "progress" },
  ],
};

export default function Hero({
  app,
  hasVideos,
  downloadReady,
}: {
  app: AppEntry;
  hasVideos: boolean;
  downloadReady: boolean;
}) {
  const latest = app.versions[0];

  // Subject nodes: use the app's subject colours when it has them, the accent otherwise.
  const nodes = app.coverage.items.map((item) => {
    const p = item.color ? subjectPalette[item.color as SubjectKey] : undefined;
    return { name: item.name, p };
  });
  const accentHex = app.theme === "teal" ? "#2DD4BF" : "#AEB8F5";
  const palette = nodes.map((n) => n.p?.glow ?? accentHex);

  const subjects = nodes.slice(0, 5).map((n, i) => ({
    name: n.name,
    bg: n.p?.bg ?? "#D5F5EF",
    fg: n.p?.fg ?? "#14907F",
    value: SCENE_VALUES[i % SCENE_VALUES.length],
  }));

  return (
    <HeroStage id="top" palette={palette} accent={accentHex} className="min-h-[100svh]">
      <div className="relative mx-auto grid min-h-[100svh] max-w-[76rem] items-center gap-10 px-5 pb-40 pt-28 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:pb-44 lg:pt-24">
        <div>
          <ul className="hero-in flex flex-wrap items-center gap-2" style={{ animationDelay: "0.1s" }}>
            {app.badges.map((b) => (
              <li key={b} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[13px] font-medium text-accent">
                {b}
              </li>
            ))}
            <li className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-[13px] text-muted">
              v{latest.version}
            </li>
            <li className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-[13px] text-muted">
              {androidLabel(app.minAndroidVersion)}
            </li>
          </ul>

          <SplitHeading
            as="h1"
            eager
            startDelay={180}
            text={app.tagline}
            className="mt-6 max-w-[15ch] font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[3.6rem] lg:text-[4.4rem]"
          />

          <p className="hero-in mt-6 max-w-lg text-[1.08rem] leading-relaxed text-muted" style={{ animationDelay: "0.75s" }}>
            {app.shortDescription}
          </p>

          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.9s" }}>
            <Magnetic>
              <a href="#download" className="btn-primary">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5V10.5M8 10.5L4.5 7M8 10.5L11.5 7M2 13.5H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {downloadReady ? "Download APK" : "Get the app"}
              </a>
            </Magnetic>
            <a href={hasVideos ? "#videos" : "#features"} className="btn-ghost">
              {hasVideos ? "Watch the walkthroughs" : "Explore features"}
            </a>
          </div>
        </div>

        <HeroDevice scene={app.heroScene} appName={app.name} subjects={subjects} chips={CHIPS[app.heroScene]} />
      </div>

      <HeartRate className="absolute bottom-7 left-5 z-10 sm:left-8 lg:left-[max(2rem,calc((100vw-76rem)/2+2rem))]" />
    </HeroStage>
  );
}
