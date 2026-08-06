import Reveal from "./Reveal";
import type { CoverageItem } from "@/config/apps";

// Explicit class strings (not dynamically built) so Tailwind's compiler
// can see and generate them at build time. Used for Precious' clinical
// subjects; items without a `color` fall back to the app's themed accent.
const subjectColorClasses: Record<string, { bg: string; fg: string }> = {
  peds: { bg: "bg-subject-peds-bg", fg: "text-subject-peds-fg" },
  og: { bg: "bg-subject-og-bg", fg: "text-subject-og-fg" },
  comm: { bg: "bg-subject-comm-bg", fg: "text-subject-comm-fg" },
  im: { bg: "bg-subject-im-bg", fg: "text-subject-im-fg" },
  surg: { bg: "bg-subject-surg-bg", fg: "text-subject-surg-fg" },
};

export default function Coverage({
  sectionLabel,
  title,
  subtitle,
  items,
}: {
  sectionLabel: string;
  title: string;
  subtitle: string;
  items: CoverageItem[];
}) {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">{sectionLabel}</span>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-muted">{subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item, i) => {
            const colors = item.color ? subjectColorClasses[item.color] : undefined;
            return (
              <Reveal key={item.id} delay={i * 60}>
                <div className="flex h-full flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-semibold ${
                      colors ? `${colors.bg} ${colors.fg}` : "bg-accent-soft text-accent"
                    }`}
                  >
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted">{item.blurb}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
