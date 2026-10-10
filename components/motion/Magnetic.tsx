"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "./useInView";

/** Pulls its child a few pixels toward the cursor when it gets close. */
export default function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`;
    };
    const leave = () => {
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block transition-transform duration-200 ease-out ${className}`}>
      {children}
    </div>
  );
}
