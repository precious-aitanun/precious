"use client";

import { useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/motion/Reveal";
import type { FaqItem } from "@/config/apps";

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead title="Questions, answered" />
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.question}>
                <Reveal delay={i * 50} variant="fade">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-btn-${i}`}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className={`font-display text-lg font-medium transition-colors ${isOpen ? "text-ink" : "text-ink/85 group-hover:text-ink"}`}>
                        {item.question}
                      </span>
                      <span
                        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen ? "border-accent bg-accent text-[#12162A]" : "border-border text-muted group-hover:border-white/30"
                        }`}
                      >
                        <span className="absolute h-px w-3 bg-current" />
                        <span className={`absolute h-3 w-px bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className={`grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className={`max-w-2xl pb-7 leading-relaxed text-muted transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>{item.answer}</p>
                    </div>
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
