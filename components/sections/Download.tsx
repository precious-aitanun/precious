import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { androidLabel, formatDate } from "@/lib/format";
import { siteConfig, type AppEntry } from "@/config/apps";
import type { ApkInfo } from "@/lib/apk";

const DownloadGlyph = ({ className = "" }: { className?: string }) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path d="M8 1.5V10.5M8 10.5L4.5 7M8 10.5L11.5 7M2 13.5H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Download({ app, apkInfos }: { app: AppEntry; apkInfos: ApkInfo[] }) {
  const latest = apkInfos[0];
  const latestVersion = app.versions[0];
  const older = app.versions.slice(1);

  const facts = [
    { k: "Version", v: latestVersion.version },
    latest.sizeLabel ? { k: "Size", v: latest.sizeLabel } : null,
    { k: "Requires", v: androidLabel(app.minAndroidVersion) },
    { k: "Released", v: formatDate(latestVersion.releaseDate) },
  ].filter((f): f is { k: string; v: string } => !!f);

  return (
    <section id="download" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="scale">
          <div className="download-card relative overflow-hidden rounded-[2rem] border border-border bg-bg-raised p-8 sm:p-14 lg:p-20">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-glow-accent opacity-80" />
            <div aria-hidden="true" className="download-orbit" />

            <div className="relative mx-auto max-w-xl text-center">
              <h2 className="font-display text-[2.2rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Get {app.name}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Direct APK install. No Play Store account needed, and it takes under a minute.
              </p>

              <div className="mt-9">
                {latest.available ? (
                  <Magnetic>
                    <a href={latest.url} download={latest.fileName} className="btn-primary btn-xl">
                      <DownloadGlyph />
                      Download APK
                    </a>
                  </Magnetic>
                ) : (
                  <div className="mx-auto max-w-sm rounded-2xl border border-border bg-bg/60 p-5 text-sm leading-relaxed text-muted">
                    <p className="font-display text-base font-semibold text-ink">Download unavailable right now</p>
                    <p className="mt-1.5">
                      We&rsquo;re preparing this version. Email{" "}
                      <a className="text-accent underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
                        {siteConfig.contactEmail}
                      </a>{" "}
                      and we&rsquo;ll send it to you.
                    </p>
                  </div>
                )}
              </div>

              <dl className="mx-auto mt-10 flex flex-wrap justify-center overflow-hidden rounded-2xl border border-border bg-bg-raised/90 text-left">
                {facts.map((f) => (
                  <div key={f.k} className="min-w-[8.5rem] flex-1 border-r border-border px-5 py-3.5 last:border-r-0">
                    <dt className="text-xs text-muted">{f.k}</dt>
                    <dd className="mt-0.5 font-mono text-sm text-ink">{f.v}</dd>
                  </div>
                ))}
              </dl>

              {latestVersion.releaseNotes && (
                <div className="mx-auto mt-8 max-w-md rounded-2xl border border-accent/25 bg-accent/[0.07] p-5 text-left">
                  <p className="font-display text-sm font-semibold text-accent">What&rsquo;s new in v{latestVersion.version}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{latestVersion.releaseNotes}</p>
                </div>
              )}

              <p className="mx-auto mt-8 max-w-sm text-[13px] leading-relaxed text-muted">
                Android will ask you to confirm installing from this source the first time. That&rsquo;s expected for any app
                installed outside the Play Store, not a warning about this app specifically.
              </p>

              {older.length > 0 && (
                <details className="group mx-auto mt-10 max-w-md text-left">
                  <summary className="flex cursor-pointer list-none items-center justify-center gap-2.5 text-sm text-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                    Previous versions
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border transition-transform duration-300 group-open:rotate-45">
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <ul className="mt-5 space-y-3">
                    {older.map((version, i) => {
                      const info = apkInfos[i + 1];
                      return (
                        <li key={version.version} className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg/50 px-4 py-3.5">
                          <div className="min-w-0">
                            <p className="font-mono text-sm text-ink">
                              v{version.version} <span className="text-muted">{formatDate(version.releaseDate)}</span>
                            </p>
                            <p className="mt-1 text-[13px] leading-snug text-muted">{version.releaseNotes}</p>
                          </div>
                          {info.available ? (
                            <a href={info.url} download={info.fileName} className="shrink-0 text-sm font-medium text-accent transition-colors hover:text-accent-strong">
                              Download
                            </a>
                          ) : (
                            <span className="shrink-0 text-xs text-muted">Unavailable</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
