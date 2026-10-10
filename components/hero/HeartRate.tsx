"use client";

import { useEffect, useRef, useState } from "react";
import { PULSE_EVENT } from "./PulseField";

/** Live heart-rate readout driven by the canvas's actual R-peaks. */
export default function HeartRate({ className = "" }: { className?: string }) {
  const [bpm, setBpm] = useState<number | null>(null);
  const dot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onBeat = (e: Event) => {
      setBpm((e as CustomEvent<{ bpm: number }>).detail.bpm);
      dot.current?.animate(
        [{ transform: "scale(1)", opacity: 1 }, { transform: "scale(1.9)", opacity: 0.35 }, { transform: "scale(1)", opacity: 1 }],
        { duration: 420, easing: "ease-out" }
      );
    };
    window.addEventListener(PULSE_EVENT, onBeat);
    return () => window.removeEventListener(PULSE_EVENT, onBeat);
  }, []);

  return (
    <div className={`flex items-center gap-3 font-mono text-xs text-muted ${className}`} aria-hidden="true">
      <span ref={dot} className="block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent-rgb)/0.9)]" />
      <span className="tabular-nums text-ink">{bpm ?? "--"}</span>
      <span>bpm</span>
      <span className="hidden text-muted/60 sm:inline">sinus rhythm</span>
    </div>
  );
}
