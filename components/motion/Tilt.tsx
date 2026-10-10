"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "./useInView";

/**
 * 3D tilt that follows the pointer, with a moving highlight.
 * Writes straight to the element's style inside a rAF loop, so it never
 * triggers a React re-render. Only active for mouse users who haven't
 * asked for reduced motion.
 *
 * `scope="window"` tracks the pointer anywhere on the page (used for the
 * hero device); the default tracks only while hovering the element.
 */
export default function Tilt({
  children,
  max = 8,
  scope = "self",
  className = "",
  glare = true,
}: {
  children: React.ReactNode;
  max?: number;
  scope?: "self" | "window";
  className?: string;
  glare?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const body = inner.current;
    if (!el || !body || !hasFinePointer() || prefersReducedMotion()) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let running = false;

    const loop = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      body.style.transform = `rotateY(${(cx * max).toFixed(2)}deg) rotateX(${(-cy * max).toFixed(2)}deg)`;
      body.style.setProperty("--gx", `${50 + cx * 40}%`);
      body.style.setProperty("--gy", `${50 + cy * 40}%`);
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (scope === "window") {
        tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      } else {
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    const target: HTMLElement | Window = scope === "window" ? window : el;
    target.addEventListener("pointermove", move as EventListener, { passive: true });
    target.addEventListener("pointerleave", leave as EventListener);
    return () => {
      target.removeEventListener("pointermove", move as EventListener);
      target.removeEventListener("pointerleave", leave as EventListener);
      cancelAnimationFrame(raf);
    };
  }, [max, scope]);

  return (
    <div ref={wrap} className={className} style={{ perspective: "1100px" }}>
      <div ref={inner} className="tilt-body relative" style={{ transformStyle: "preserve-3d" }}>
        {children}
        {glare && <span aria-hidden="true" className="tilt-glare" />}
      </div>
    </div>
  );
}
