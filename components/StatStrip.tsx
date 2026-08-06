import Reveal from "./Reveal";
import type { AppEntry } from "@/config/apps";

export default function StatStrip({ app }: { app: AppEntry }) {
  return (
    <section className="border-y border-border/60 bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Reveal>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {app.stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
