"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/motion/useInView";
import type { StepItem } from "@/config/apps";

/**
 * Vertical timeline whose rail fills as you scroll, lighting each step
 * node as the fill reaches it. Progress is written to a CSS variable
 * (no re-render per scroll tick); only the active step index is state.
 */
export default function StepRail({ steps }: { steps: StepItem[] }) {
  const wrap = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const still = prefersReducedMotion();
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const p = still ? 1 : Math.min(1, Math.max(0, (mid - rect.top) / rect.height));
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      const items = el.querySelectorAll<HTMLElement>("[data-step]");
      let count = 0;
      items.forEach((it) => {
        const r = it.getBoundingClientRect();
        if (still || r.top + 20 < mid) count++;
      });
      setReached(count);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={wrap} className="relative space-y-12 pl-14 sm:pl-16">
      <span aria-hidden="true" className="absolute bottom-3 left-[19px] top-3 w-px bg-border sm:left-[23px]">
        <span ref={fill} className="block h-full origin-top bg-accent shadow-[0_0_14px_rgb(var(--accent-rgb))]" style={{ transform: "scaleY(0)" }} />
      </span>

      {steps.map((step, i) => {
        const on = i < reached;
        return (
          <li key={step.label} data-step className="relative">
            <span
              className={`absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm transition-all duration-500 sm:-left-16 sm:h-12 sm:w-12 ${
                on ? "border-accent bg-accent text-[#12162A] shadow-[0_0_0_7px_rgb(var(--accent-rgb)/0.14)]" : "border-border bg-bg text-muted"
              }`}
            >
              {i + 1}
            </span>
            <h3 className={`font-display text-xl font-semibold transition-colors duration-500 ${on ? "text-ink" : "text-muted"}`}>{step.label}</h3>
            <p className="mt-2 max-w-md leading-relaxed text-muted">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
