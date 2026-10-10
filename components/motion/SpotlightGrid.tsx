"use client";

import { useRef } from "react";

/**
 * Wrapper for a grid of `.spot-card`s. As the pointer moves over the grid
 * every card receives the pointer position as CSS variables, so a soft
 * accent light follows the cursor across card borders and surfaces.
 */
export default function SpotlightGrid({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const cards = ref.current?.querySelectorAll<HTMLElement>(".spot-card");
    cards?.forEach((card) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={`spot-grid ${className}`}>
      {children}
    </div>
  );
}
