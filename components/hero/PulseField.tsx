"use client";

import { useEffect, useRef } from "react";
import { PulseEngine, type Anchor, type RGB } from "@/lib/pulse-engine";
import { prefersReducedMotion } from "@/components/motion/useInView";

const hexToRgb = (hex: string): RGB => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export const PULSE_EVENT = "pulse:beat";

/**
 * Canvas layer for the hero. Lives behind the content, ignores pointer
 * events itself (the parent forwards them), and does as little as possible
 * when it can't be seen: it pauses off-screen and when the tab is hidden.
 *
 * Anchor positions come from the page: any element inside `host` marked
 * with `data-hero-focus` is the centre the subject nodes orbit. When none
 * exists (e.g. the home page) they spread across the right-hand side.
 */
export default function PulseField({
  palette,
  accent,
  host,
  layout = "orbit",
}: {
  palette: string[];
  accent: string;
  host: React.RefObject<HTMLElement | null>;
  layout?: "orbit" | "split";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hostEl = host.current;
    if (!canvas || !hostEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const colors = palette.map(hexToRgb);
    const engine = new PulseEngine(ctx, {
      accent: hexToRgb(accent),
      reducedMotion: reduced,
      onBeat: (bpm) => window.dispatchEvent(new CustomEvent(PULSE_EVENT, { detail: { bpm } })),
    });

    let width = 0;
    let height = 0;

    const buildAnchors = (): Anchor[] => {
      const hostRect = hostEl.getBoundingClientRect();
      const focus = hostEl.querySelector<HTMLElement>("[data-hero-focus]");
      const n = colors.length;
      const compact = width < 700;

      if (layout === "split") {
        // Two clusters, one per app family (home page).
        const half = Math.ceil(n / 2);
        return colors.map((color, i) => {
          const left = i < half;
          const idx = left ? i : i - half;
          const count = left ? half : n - half;
          const cx = width * (left ? 0.2 : 0.8);
          const cy = height * 0.44;
          const a = (idx / count) * Math.PI * 2 - 1.1;
          const rx = Math.min(210, width * 0.17);
          return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * rx * 0.85, color, r: 5.5 };
        });
      }

      let cx = width * 0.74;
      let cy = height * 0.45;
      let rx = Math.min(330, width * 0.23);
      let ry = Math.min(300, height * 0.34);
      if (focus) {
        const r = focus.getBoundingClientRect();
        cx = r.left - hostRect.left + r.width / 2;
        cy = r.top - hostRect.top + r.height / 2;
        rx = r.width / 2 + (compact ? 38 : 120);
        ry = r.height / 2 + (compact ? 10 : 36);
      }
      return colors.map((color, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2 + 0.35;
        return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry, color, r: compact ? 4.5 : 6 };
      });
    };

    const layoutNow = () => {
      const rect = hostEl.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      engine.resize(width, height, dpr, buildAnchors());
      if (reduced) engine.renderStill();
    };

    layoutNow();

    const ro = new ResizeObserver(layoutNow);
    ro.observe(hostEl);

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = hostEl.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      engine.setPointer(x >= 0 && y >= 0 && x <= r.width && y <= r.height ? x : null, y);
    };
    const onLeave = () => engine.setPointer(null);
    window.addEventListener("pointermove", onPointer, { passive: true });
    hostEl.addEventListener("pointerleave", onLeave);

    if (reduced) {
      return () => {
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        hostEl.removeEventListener("pointerleave", onLeave);
      };
    }

    let raf = 0;
    let last = performance.now();
    let visible = true;
    let tabVisible = !document.hidden;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = (now - last) / 1000;
      last = now;
      engine.frame(dt);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (visible && tabVisible) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(hostEl);
    const onVis = () => {
      tabVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);
    sync();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      hostEl.removeEventListener("pointerleave", onLeave);
    };
  }, [palette, accent, host, layout]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
