import Reveal from "./Reveal";
import { appConfig } from "@/config/app.config";

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-border/60 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">Questions</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Frequently asked
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-border">
          {appConfig.faq.map((item, i) => (
            <Reveal key={item.question} delay={i * 50}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[15px] font-medium text-ink">
                  {item.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-transform group-open:rotate-45">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path
                        d="M5 0V10M0 5H10"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
