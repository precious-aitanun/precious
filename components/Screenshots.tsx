import PhoneFrame from "./PhoneFrame";
import Reveal from "./Reveal";
import { appConfig } from "@/config/app.config";

export default function Screenshots() {
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

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {appConfig.screenshots.map((shot, i) => (
            <Reveal key={shot.src} delay={i * 100} className="flex flex-col items-center">
              <PhoneFrame src={shot.src} alt={shot.alt} />
              <p className="mt-5 max-w-[240px] text-center text-sm text-muted">{shot.caption}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
