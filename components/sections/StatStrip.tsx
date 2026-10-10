import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import type { AppEntry } from "@/config/apps";

export default function StatStrip({ app }: { app: AppEntry }) {
  return (
    <section aria-label="At a glance" className="px-5 sm:px-8">
      <Reveal>
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {app.stats.map((stat) => (
            <div key={stat.label} className="bg-bg-raised px-6 py-7 sm:px-8 sm:py-9">
              <dt className="order-2 text-sm text-muted">{stat.label}</dt>
              <dd className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
