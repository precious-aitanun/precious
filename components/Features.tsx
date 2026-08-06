import Reveal from "./Reveal";
import type { AppEntry } from "@/config/apps";

export default function Features({ app }: { app: AppEntry }) {
  return (
    <section id="features" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            Why it works
          </span>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {app.featuresHeadline}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {app.features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-accent/40">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft">
                  <span className="font-mono text-xs font-medium text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-[17px] font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
