import Reveal from "./Reveal";
import type { AppEntry } from "@/config/apps";
import type { ApkInfo } from "@/lib/apk";

export default function Download({ app, apkInfos }: { app: AppEntry; apkInfos: ApkInfo[] }) {
  const latest = apkInfos[0];
  const latestVersion = app.versions[0];
  const olderVersions = app.versions.slice(1);

  return (
    <section id="download" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-card sm:p-14">
            <div className="absolute inset-0 -z-10 bg-glow-accent opacity-70" />

            <div className="mx-auto max-w-xl text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                Ready when you are
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Get {app.name}
              </h2>
              <p className="mt-4 text-muted">
                Direct APK install — no Play Store account required. Takes under a minute.
              </p>

              <a
                href={latest.url}
                download={latest.fileName}
                className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 font-display text-base font-semibold text-[#12162A] transition-all hover:bg-accent-strong hover:shadow-[0_0_0_8px_rgb(var(--accent-rgb)/0.15)] sm:w-auto"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 1.5V10.5M8 10.5L4.5 7M8 10.5L11.5 7M2 13.5H14"
                    stroke="#12162A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download APK
              </a>

              <dl className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs text-muted">
                <div className="flex items-center gap-1.5">
                  <dt className="text-muted/70">version</dt>
                  <dd className="text-ink">{latestVersion.version}</dd>
                </div>
                {latest.sizeLabel && (
                  <div className="flex items-center gap-1.5">
                    <dt className="text-muted/70">size</dt>
                    <dd className="text-ink">{latest.sizeLabel}</dd>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <dt className="text-muted/70">requires</dt>
                  <dd className="text-ink">Android {app.minAndroidVersion}+</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="text-muted/70">released</dt>
                  <dd className="text-ink">{latestVersion.releaseDate}</dd>
                </div>
              </dl>

              {latestVersion.releaseNotes && (
                <div className="mx-auto mt-8 max-w-md rounded-2xl border border-accent/25 bg-accent-soft/40 p-4 text-left">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                    What&rsquo;s new in v{latestVersion.version}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {latestVersion.releaseNotes}
                  </p>
                </div>
              )}

              <p className="mx-auto mt-8 max-w-sm text-xs leading-relaxed text-muted">
                Android will ask you to confirm installing from this source the first time —
                that&rsquo;s expected for any app installed outside the Play Store, not a warning
                about this app specifically.
              </p>

              {olderVersions.length > 0 && (
                <details className="group mx-auto mt-10 max-w-md text-left">
                  <summary className="flex cursor-pointer list-none items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink">
                    Previous versions
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-transform group-open:rotate-45">
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path
                          d="M5 0V10M0 5H10"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <ul className="mt-4 space-y-3">
                    {olderVersions.map((version, i) => {
                      const info = apkInfos[i + 1];
                      return (
                        <li
                          key={version.version}
                          className="flex items-center justify-between gap-4 rounded-xl border border-border bg-bg/40 px-4 py-3"
                        >
                          <div>
                            <p className="font-mono text-xs text-ink">
                              v{version.version} <span className="text-muted">· {version.releaseDate}</span>
                            </p>
                            <p className="mt-0.5 text-xs text-muted">{version.releaseNotes}</p>
                          </div>
                          <a
                            href={info.url}
                            download={info.fileName}
                            className="shrink-0 font-mono text-xs text-accent transition-colors hover:text-accent-strong"
                          >
                            Download
                          </a>
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
