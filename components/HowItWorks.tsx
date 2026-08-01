import Reveal from "./Reveal";
import { appConfig } from "@/config/app.config";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border/60 bg-surface/40 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">Getting started</span>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            From download to your first quiz, in four steps
          </h2>
        </Reveal>

        <div className="relative mt-14 grid gap-8 sm:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-5 hidden h-px bg-border sm:block"
            aria-hidden="true"
          />
          {appConfig.steps.map((step, i) => (
            <Reveal key={step.label} delay={i * 90} className="relative">
              <div className="relative z-10 mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-bg font-mono text-sm text-accent">
                {i + 1}
              </div>
              <h3 className="font-display text-base font-semibold text-ink">{step.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
