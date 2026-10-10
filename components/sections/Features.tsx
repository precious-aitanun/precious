import Reveal from "@/components/motion/Reveal";
import SpotlightGrid from "@/components/motion/SpotlightGrid";
import SectionHead from "@/components/ui/SectionHead";
import Icon from "@/components/ui/Icon";
import type { AppEntry } from "@/config/apps";

export default function Features({ app }: { app: AppEntry }) {
  return (
    <section id="features" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead title={app.featuresHeadline} />

        <SpotlightGrid className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {app.features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 80} variant="scale" className="h-full">
              <article className="spot-card group flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-8">
                {/* Oversized ghost of the icon, for depth */}
                <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 text-accent opacity-[0.07] transition-all duration-700 group-hover:-rotate-6 group-hover:scale-110 group-hover:opacity-[0.16]">
                  <Icon name={feature.icon} className="h-44 w-44 [stroke-width:0.7]" />
                </span>
                <span className="relative mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                  <Icon name={feature.icon} className="h-6 w-6" />
                </span>
                <h3 className="relative font-display text-xl font-semibold tracking-tight text-ink">{feature.title}</h3>
                <p className="relative mt-3 leading-relaxed text-muted">{feature.description}</p>
              </article>
            </Reveal>
          ))}
        </SpotlightGrid>
      </div>
    </section>
  );
}
