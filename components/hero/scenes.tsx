"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/components/motion/useInView";
import Logo from "@/components/layout/Logo";

export interface SceneSubject {
  name: string;
  bg: string;
  fg: string;
  value: number;
}

/* ------------------------------------------------------------------ */
/* Library scene (Precious): home screen with mastery bars filling in. */
/* ------------------------------------------------------------------ */

export function LibraryScene({ appName, subjects }: { appName: string; subjects: SceneSubject[] }) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setLive(true), 700);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex h-full flex-col gap-2.5 px-3.5 pb-4 pt-10 text-[11px] leading-tight">
      <div className="flex items-center gap-2.5">
        <Logo className="h-8 w-8 shrink-0 text-accent" />
        <div className="min-w-0">
          <p className="truncate font-display text-[13px] font-semibold text-white">{appName}</p>
          <p className="text-[9px] text-white/50">Medical Study Companion</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1">
        <span className="rounded-lg bg-accent py-1.5 text-center font-semibold text-[#12162A]">Core Library</span>
        <span className="py-1.5 text-center text-white/55">Workspace</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#1C2540,#101626)] p-3.5">
        <p className="font-display text-[15px] font-semibold text-white">Good afternoon, Scholar</p>
        <p className="mt-0.5 text-[9.5px] text-white/55">Ready to continue your medical journey?</p>
        <svg viewBox="0 0 160 28" className="mt-2.5 h-6 w-full" fill="none" aria-hidden="true">
          <path
            className="scene-ecg"
            d="M0 16H34L40 16L44 6L49 25L54 12L58 16H92L98 16L102 3L107 27L112 12L116 16H160"
            stroke="rgb(var(--accent-rgb))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
          />
        </svg>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-accent p-3 text-[#12162A]">
        <span className="scene-shine" aria-hidden="true" />
        <div className="relative flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#12162A]/15">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9l10-5 10 5-10 5z" />
              <path d="M6 11.2v4.6c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.6" />
            </svg>
          </span>
          <div>
            <p className="font-display text-[12.5px] font-semibold">Global Exam Mode</p>
            <p className="text-[9.5px] opacity-70">Mix all subjects for a real exam simulation</p>
          </div>
        </div>
      </div>

      <p className="mt-0.5 font-display text-[12px] font-semibold text-white">Subjects</p>
      <ul className="flex flex-col gap-1.5">
        {subjects.map((s, i) => (
          <li key={s.name} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-display text-[12px] font-bold"
              style={{ background: s.bg, color: s.fg }}
            >
              {s.name[0]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10.5px] font-medium text-white">{s.name}</p>
              <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full origin-left rounded-full transition-transform duration-[1400ms] ease-out"
                  style={{
                    background: s.fg,
                    width: `${s.value}%`,
                    transform: live ? "scaleX(1)" : "scaleX(0)",
                    transitionDelay: `${i * 140}ms`,
                    filter: `drop-shadow(0 0 4px ${s.fg})`,
                  }}
                />
              </div>
            </div>
            <span className="font-mono text-[9.5px] tabular-nums text-white/55">{live ? s.value : 0}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ward scene (Residents): task list that ticks itself off.            */
/* ------------------------------------------------------------------ */

const TASKS = [
  { text: "Repeat potassium", where: "Bed 12", level: "STAT" },
  { text: "Review chest X-ray", where: "Bed 4", level: "HIGH" },
  { text: "Update family", where: "Bed 9", level: "ROUTINE" },
  { text: "Chase discharge summary", where: "Bed 2", level: "ROUTINE" },
  { text: "Re-site cannula", where: "Bed 7", level: "HIGH" },
] as const;

const LEVEL_STYLE: Record<string, string> = {
  STAT: "bg-rose-400/15 text-rose-300",
  HIGH: "bg-amber-400/15 text-amber-300",
  ROUTINE: "bg-accent/15 text-accent",
};

export function WardScene({ appName }: { appName: string }) {
  const total = TASKS.length;
  const [done, setDone] = useState(2);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setDone((d) => (d >= total ? 0 : d + 1)), 1700);
    return () => clearInterval(id);
  }, [total]);

  const pct = Math.round((done / total) * 100);

  return (
    <div className="flex h-full flex-col gap-2.5 px-3.5 pb-4 pt-10 text-[11px] leading-tight">
      <div className="flex items-center gap-2.5">
        <Logo className="h-8 w-8 shrink-0 text-accent" />
        <div className="min-w-0">
          <p className="truncate font-display text-[13px] font-semibold text-white">{appName}</p>
          <p className="text-[9px] text-white/50">Duty companion</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#12302F,#0E1A22)] p-3.5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9.5px] text-white/55">Shift progress</p>
            <p className="font-display text-[22px] font-semibold tabular-nums text-white">
              {done}
              <span className="text-[13px] text-white/45"> / {total}</span>
            </p>
          </div>
          <p className="font-mono text-[10px] tabular-nums text-accent">{pct}%</p>
        </div>
        <div className="mt-2.5 h-[5px] overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out"
            style={{ width: `${pct}%`, boxShadow: "0 0 10px rgb(var(--accent-rgb)/0.8)" }}
          />
        </div>
      </div>

      <p className="mt-0.5 font-display text-[12px] font-semibold text-white">Tasks</p>
      <ul className="flex flex-col gap-1.5">
        {TASKS.map((t, i) => {
          const checked = i < done;
          return (
            <li
              key={t.text}
              className={`flex items-center gap-2.5 rounded-xl border p-2 transition-colors duration-500 ${
                checked ? "border-white/5 bg-white/[0.015]" : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <span
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all duration-300 ${
                  checked ? "border-accent bg-accent" : "border-white/25"
                }`}
              >
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="#12162A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path
                    d="M2.5 6.2l2.4 2.4 4.6-5"
                    pathLength={1}
                    style={{ strokeDasharray: 1, strokeDashoffset: checked ? 0 : 1, transition: "stroke-dashoffset .35s ease .1s" }}
                  />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-[10.5px] font-medium transition-colors ${checked ? "text-white/35 line-through" : "text-white"}`}>
                  {t.text}
                </p>
                <p className="text-[9px] text-white/40">{t.where}</p>
              </div>
              <span className={`rounded-md px-1.5 py-0.5 font-mono text-[8.5px] font-semibold ${LEVEL_STYLE[t.level]}`}>{t.level}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
        <div className="flex items-center gap-1.5 font-display text-[11px] font-semibold text-white">
          {["S", "B", "A", "R"].map((l) => (
            <span key={l} className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/15 text-accent">
              {l}
            </span>
          ))}
        </div>
        <span className="rounded-full bg-accent px-2.5 py-1 text-[9.5px] font-semibold text-[#12162A]">Export PDF</span>
      </div>
    </div>
  );
}
