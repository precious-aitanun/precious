import Reveal from "@/components/motion/Reveal";
import Tilt from "@/components/motion/Tilt";
import SectionHead from "@/components/ui/SectionHead";
import PhoneFrame from "@/components/ui/PhoneFrame";
import type { AppEntry, AppScreenshot } from "@/config/apps";

function Row({ items, start }: { items: AppScreenshot[]; start: number }) {
  return (
    <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-10 sm:overflow-visible sm:px-0">
      {items.map((shot, i) => (
        <Reveal key={shot.src} delay={start + i * 100} className="flex w-[68vw] max-w-[270px] shrink-0 snap-center flex-col items-center sm:w-[270px]">
          <Tilt max={7} className="w-full">
            <PhoneFrame src={shot.src} alt={shot.alt} />
          </Tilt>
          <p className="mt-6 max-w-[240px] text-center text-sm leading-relaxed text-muted">{shot.caption}</p>
        </Reveal>
      ))}
    </div>
  );
}

export default function Screenshots({ app }: { app: AppEntry }) {
  const evergreen = app.screenshots.filter((s) => !s.isNew);
  const updated = app.screenshots.filter((s) => s.isNew);
  const latest = app.versions[0]?.version;
  if (app.screenshots.length === 0) return null;

  return (
    <section id="screenshots" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead title="A closer look at the interface" />
        {evergreen.length > 0 && <Row items={evergreen} start={0} />}
        {updated.length > 0 && (
          <>
            <Reveal>
              <div className="mx-auto mt-16 flex max-w-2xl items-center gap-4">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-[#12162A]">New in v{latest}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <Row items={updated} start={100} />
          </>
        )}
      </div>
    </section>
  );
}
