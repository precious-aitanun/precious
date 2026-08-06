"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import type { AppEntry } from "@/config/apps";

const sectionLinks = [
  { href: "#features", label: "Features" },
  { href: "#screenshots", label: "Screenshots" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar({
  app,
  otherApp,
}: {
  app: AppEntry;
  otherApp: { slug: string; name: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="hidden shrink-0 items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-ink sm:flex"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M7.5 2L3 6L7.5 10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All apps
          </Link>
          <a href="#top" className="flex min-w-0 shrink items-center gap-2.5">
            <Logo className="h-7 w-7 shrink-0 text-accent" />
            <span className="truncate font-display text-[15px] font-semibold tracking-tight text-ink">
              {app.name}
            </span>
          </a>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href={`/${otherApp.slug}`}
            className="text-xs text-muted transition-colors hover:text-accent"
          >
            Also try {otherApp.name} →
          </Link>
          <a
            href="#download"
            className="rounded-full bg-accent px-5 py-2 font-display text-sm font-semibold text-[#12162A] transition-colors hover:bg-accent-strong"
          >
            Download
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-ink md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M3 3L15 15M15 3L3 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5H16M2 9H16M2 13H16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/60 px-5 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface hover:text-ink"
            >
              ← All apps
            </Link>
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={`/${otherApp.slug}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-accent hover:bg-surface"
            >
              Also try {otherApp.name} →
            </Link>
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center font-display text-sm font-semibold text-[#12162A]"
            >
              Download
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
