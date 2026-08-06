import Link from "next/link";
import Logo from "./Logo";
import type { AppEntry } from "@/config/apps";
import { siteConfig } from "@/config/apps";

export default function Footer({ app }: { app: AppEntry }) {
  return (
    <footer className="border-t border-border/60 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-6 w-6 text-accent" />
          <span className="font-display text-sm font-semibold text-ink">{app.name}</span>
        </Link>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Independent study &amp; duty resource,
          not affiliated with any university, hospital, or examination board.
        </p>

        <a href={`mailto:${siteConfig.contactEmail}`} className="text-xs text-muted hover:text-ink">
          {siteConfig.contactEmail}
        </a>
      </div>
    </footer>
  );
}
