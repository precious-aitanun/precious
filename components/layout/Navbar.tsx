"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export interface NavLink {
  href: string; // "#features"
  label: string;
}

/**
 * Sticky header with: a thin scroll-progress line, scroll-spy highlighting
 * of the section you're in, a frosted background that appears once you
 * scroll, and a mobile menu.
 */
export default function Navbar({
  appName,
  links,
  otherApp,
}: {
  appName: string;
  links: NavLink[];
  otherApp?: { slug: string; name: string };
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const bar = useRef<HTMLSpanElement>(null);

  // Progress line + frosted state, throttled through rAF.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll-spy
  useEffect(() => {
    const targets = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [links]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? "border-b border-border/70 bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[76rem] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <div className="flex min-w-0 items-center gap-5">
          <a href="#top" className="flex min-w-0 shrink items-center gap-2.5" aria-label={`${appName}, back to top`}>
            <Logo className="h-7 w-7 shrink-0 text-accent" />
            <span className="truncate font-display text-[16px] font-semibold tracking-tight text-ink">{appName}</span>
          </a>
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-full border border-border/80 px-3 py-1 text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink sm:inline-flex"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M7.5 2L3 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All apps
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                active === link.href ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {active === link.href && (
                <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-white/10" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#download"
            className="rounded-full bg-accent px-4 py-2 font-display text-sm font-semibold text-[#12162A] transition-all hover:bg-accent-strong hover:shadow-[0_0_0_6px_rgb(var(--accent-rgb)/0.16)]"
          >
            Download
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-3 h-px w-4 bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-5 pb-5 pt-1" aria-label="Sections (mobile)">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="rounded-xl px-3 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            {otherApp && (
              <Link href={`/${otherApp.slug}`} tabIndex={open ? 0 : -1} className="mt-1 rounded-xl border border-border px-3 py-3 text-base text-ink">
                Also see {otherApp.name}
              </Link>
            )}
          </nav>
        </div>
      </div>

      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-transparent">
        <span ref={bar} className="block h-px origin-left bg-accent shadow-[0_0_10px_rgb(var(--accent-rgb))]" style={{ transform: "scaleX(0)" }} />
      </span>
    </header>
  );
}
