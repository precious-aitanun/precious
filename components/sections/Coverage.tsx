import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { subjectPalette, type SubjectKey } from "@/lib/palette";
import type { AppEntry } from "@/config/apps";

export default function Coverage({ app }: { app: AppEntry }) {
  const { title, subtitle, items } = app.coverage;
  return (
    <section id="coverage" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead title={title} subtitle={subtitle} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((item, i) => {
            const p = item.color ? subjectPalette[item.color as SubjectKey] : undefined;
            const color = p?.glow ?? "rgb(var(--accent-rgb))";
            // 5 items -> 3 + 2 on desktop; 4 -> 2 + 2; otherwise 3 across.
            const span = items.length === 4 ? "lg:col-span-3" : i < 3 ? "lg:col-span-2" : items.length === 5 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <li key={item.id} className={span}>
                <Reveal delay={i * 70} className="h-full">
                  <div
                    className="coverage-card group relative h-full overflow-hidden rounded-3xl border border-border bg-bg-raised p-7 transition-colors duration-500 hover:border-[color:var(--c)]"
                    style={{ ["--c" as string]: color }}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                      style={{ background: color }}
                    />
                    <span className="relative mb-5 block h-1 w-10 rounded-full" style={{ background: color, boxShadow: `0 0 14px ${color}` }} />
                    <h3 className="relative font-display text-xl font-semibold tracking-tight text-ink">{item.name}</h3>
                    {item.blurb && <p className="relative mt-2.5 leading-relaxed text-muted">{item.blurb}</p>}
                    {item.tags && (
                      <ul className="relative mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <li key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[13px] text-muted">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
