import Reveal from "./Reveal";
import { appConfig } from "@/config/app.config";
import type { ApkInfo } from "@/lib/apk";

export default function Download({ apkInfo }: { apkInfo: ApkInfo }) {
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
                Get {appConfig.name}
              </h2>
              <p className="mt-4 text-muted">
                Direct APK install — no Play Store account required. Takes under a minute.
              </p>

              <a
                href={apkInfo.url}
                download={apkInfo.fileName}
                className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 font-display text-base font-semibold text-[#12162A] transition-all hover:bg-accent-strong hover:shadow-[0_0_0_8px_rgba(174,184,245,0.15)] sm:w-auto"
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
                  <dd className="text-ink">{appConfig.version}</dd>
                </div>
                {apkInfo.sizeLabel && (
                  <div className="flex items-center gap-1.5">
                    <dt className="text-muted/70">size</dt>
                    <dd className="text-ink">{apkInfo.sizeLabel}</dd>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <dt className="text-muted/70">requires</dt>
                  <dd className="text-ink">Android {appConfig.minAndroidVersion}+</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="text-muted/70">released</dt>
                  <dd className="text-ink">{appConfig.releaseDate}</dd>
                </div>
              </dl>

              <p className="mx-auto mt-8 max-w-sm text-xs leading-relaxed text-muted">
                Android will ask you to confirm installing from this source the first time — that's
                expected for any app installed outside the Play Store, not a warning about this app
                specifically.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
