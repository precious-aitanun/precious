import Reveal from "@/components/motion/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import StepRail from "./StepRail";
import type { AppEntry } from "@/config/apps";

export default function HowItWorks({ app }: { app: AppEntry }) {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-y border-border/60 bg-bg-raised/50 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead title={app.stepsHeadline} />
          <Reveal delay={250}>
            <a href="#download" className="btn-ghost mt-8 hidden lg:inline-flex">
              Go to download
            </a>
          </Reveal>
        </div>
        <StepRail steps={app.steps} />
      </div>
    </section>
  );
}
