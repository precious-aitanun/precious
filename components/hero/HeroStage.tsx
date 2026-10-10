"use client";

import { useRef } from "react";
import PulseField from "./PulseField";

/**
 * The hero section shell: owns the canvas behind everything and hands the
 * page layout (server-rendered) to it as children.
 */
export default function HeroStage({
  children,
  palette,
  accent,
  layout = "orbit",
  className = "",
  id,
}: {
  children: React.ReactNode;
  palette: string[];
  accent: string;
  layout?: "orbit" | "split";
  className?: string;
  id?: string;
}) {
  const host = useRef<HTMLElement>(null);
  return (
    <section ref={host} id={id} className={`relative isolate overflow-hidden ${className}`}>
      <PulseField palette={palette} accent={accent} host={host} layout={layout} />
      {/* Keeps copy readable over the animation. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 bottom-44 bg-[linear-gradient(90deg,rgb(var(--bg-rgb)/0.88)_0%,rgb(var(--bg-rgb)/0.55)_38%,transparent_70%)] lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />
      {children}
    </section>
  );
}
