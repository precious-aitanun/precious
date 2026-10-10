import Link from "next/link";
import Logo from "./Logo";
import { apps, siteConfig } from "@/config/apps";

export default function Footer({ currentSlug }: { currentSlug?: string }) {
  return (
    <footer className="border-t border-border/60 px-5 pb-10 pt-14 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Logo className="h-7 w-7 text-accent" />
            <span className="font-display text-base font-semibold text-ink">{siteConfig.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Focused study and duty tools for doctors in training.
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-ink">Apps</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link
                  href={`/${app.slug}`}
                  className={`transition-colors hover:text-ink ${app.slug === currentSlug ? "text-ink" : "text-muted"}`}
                >
                  {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-ink">Contact</p>
          <a href={`mailto:${siteConfig.contactEmail}`} className="mt-4 inline-block text-sm text-muted transition-colors hover:text-ink">
            {siteConfig.contactEmail}
          </a>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl border-t border-border/50 pt-6 text-xs leading-relaxed text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. Independent study &amp; duty resource, not affiliated with any
        university, hospital, or examination board.
      </p>
    </footer>
  );
}
