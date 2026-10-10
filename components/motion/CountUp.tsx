"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, useInView } from "./useInView";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+";

/**
 * Numbers count up; words "decode" from random characters, locking in
 * letter by letter. The real text is always rendered (invisibly) so the
 * layout never shifts and screen readers read the true value.
 */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const live = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = live.current;
    if (!node) return;
    if (!inView || prefersReducedMotion()) {
      node.textContent = inView ? value : "";
      return;
    }

    const numeric = value.match(/^(\d+)(%?)$/);
    let raf = 0;
    const start = performance.now();

    if (numeric) {
      const target = Number(numeric[1]);
      const suffix = numeric[2];
      const duration = 1100;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        node.textContent = `${Math.round(target * eased)}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } else {
      const perChar = 90;
      const tick = (now: number) => {
        const elapsed = now - start;
        let out = "";
        for (let i = 0; i < value.length; i++) {
          const ch = value[i];
          if (ch === " " || elapsed > 250 + i * perChar) out += ch;
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        node.textContent = out;
        if (elapsed < 250 + value.length * perChar) raf = requestAnimationFrame(tick);
        else node.textContent = value;
      };
      raf = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className={`relative inline-block tabular-nums ${className}`}>
      <span className="invisible">{value}</span>
      <span ref={live} aria-hidden="true" className="absolute inset-0" />
      <span className="sr-only">{value}</span>
    </span>
  );
}
