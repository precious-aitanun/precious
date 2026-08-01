import Logo from "./Logo";
import { appConfig } from "@/config/app.config";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Logo className="h-6 w-6" />
          <span className="font-display text-sm font-semibold text-ink">{appConfig.name}</span>
        </div>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {appConfig.name}. Independent study resource, not
          affiliated with any university or examination board.
        </p>

        <a href={`mailto:${appConfig.contactEmail}`} className="text-xs text-muted hover:text-ink">
          {appConfig.contactEmail}
        </a>
      </div>
    </footer>
  );
}
