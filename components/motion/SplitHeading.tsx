"use client";

import { createElement, useEffect, useState } from "react";
import { useInView } from "./useInView";

/**
 * Headline whose words rise out of a mask, one after another.
 * Screen readers get the plain sentence; the animated words are decorative.
 * `eager` plays on load (hero); otherwise it plays when scrolled into view.
 */
export default function SplitHeading({
  text,
  as = "h2",
  className = "",
  eager = false,
  startDelay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  eager?: boolean;
  startDelay?: number;
}) {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!eager) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(id);
  }, [eager]);

  const on = eager ? mounted : inView;
  const words = text.split(" ");

  return createElement(
    as,
    { ref, className, "aria-label": text, "data-in": on },
    words.map((word, i) => (
      <span key={`${word}-${i}`} aria-hidden="true">
        <span className="sw">
          <span className="sw-in" style={{ transitionDelay: `${startDelay + i * 45}ms` }}>
            {word}
          </span>
        </span>
        {i < words.length - 1 ? " " : ""}
      </span>
    ))
  );
}
