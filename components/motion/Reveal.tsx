"use client";

import { useInView } from "./useInView";

type Variant = "rise" | "scale" | "fade";

/**
 * Brings a block in once it scrolls into view. Kept deliberately quiet:
 * short distance, one easing curve, small stagger via `delay`.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "rise",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      data-v={variant}
      data-in={inView}
      className={`rv ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
