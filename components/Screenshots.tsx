import PhoneFrame from "./PhoneFrame";
import Reveal from "./Reveal";
import type { AppEntry, AppScreenshot } from "@/config/apps";

// Keeps rows from ever leaving an orphaned gap in the grid (e.g. 2 items
// stretched across a 3-column track) by sizing the row to its item count.
function gridClass(count: number): string {
  if (count <= 1) return "max-w-xs grid-cols-1";
  if (count === 2) return "max-w-2xl sm:grid-cols-2";
  return "max-w-5xl sm:grid-cols-3";
}

function ScreenshotRow({ items, startDelay }: { items: AppScreenshot[]; startDelay: number }) {
  return (
    <div className={`mx-auto mt-14 grid gap-10 sm:gap-8 ${gridClass(items.length)}`}>
      {items.map((shot, i) => (
        <Reveal key={shot.src} delay={startDelay + i * 100} className="flex flex-col items-center">
          <PhoneFrame src={shot.src} alt={shot.alt} />
          <p className="mt-5 max-w-[240px] text-center text-sm text-muted">{shot.caption}</p>
        </Reveal>
      ))}
    </div>
  );
}

export default function Screenshots({ app }: { app: AppEntry }) {
  const evergreen = app.screenshots.filter((s) => !s.isNew);
  const updated = app.screenshots.filter((s) => s.isNew);
  const latestVersion = app.versions[0]?.version;

  return (
    <section id="screenshots" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            Inside the app
          </span>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A closer look at the interface
          </h2>
        </Reveal>

        <ScreenshotRow items={evergreen} startDelay={0} />

        {updated.length > 0 && (
          <>
            <Reveal delay={evergreen.length * 100}>
              <div className="mx-auto mt-16 flex max-w-2xl items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-accent">
                  New in v{latestVersion}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <ScreenshotRow items={updated} startDelay={(evergreen.length + 1) * 100} />
          </>
        )}
      </div>
    </section>
  );
}
