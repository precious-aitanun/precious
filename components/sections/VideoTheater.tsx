"use client";

import { useState } from "react";
import type { Video } from "@/lib/videos";

/**
 * Thumbnail that prefers YouTube's sharp "maxres" image, but quietly drops
 * to the standard one when the video doesn't have it (YouTube then returns
 * a tiny grey placeholder that still "loads" successfully).
 */
function Thumb({ video, hi = false, className = "" }: { video: Video; hi?: boolean; className?: string }) {
  const [src, setSrc] = useState(hi ? video.thumbHi : video.thumb);
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading={hi ? "eager" : "lazy"}
      decoding="async"
      onLoad={(e) => {
        if (src === video.thumbHi && e.currentTarget.naturalWidth < 400) setSrc(video.thumb);
      }}
      onError={() => (src !== video.thumb ? setSrc(video.thumb) : setFailed(true))}
      className={className}
    />
  );
}

function embedUrl(video: Video): string {
  const params = new URLSearchParams({ autoplay: "1", rel: "0", playsinline: "1", modestbranding: "1" });
  if (video.start) params.set("start", String(video.start));
  return `https://www.youtube-nocookie.com/embed/${video.id}?${params.toString()}`;
}

export default function VideoTheater({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = videos[active];
  const many = videos.length > 1;

  const choose = (i: number) => {
    setActive(i);
    setPlaying(true);
  };

  return (
    <div className={many ? "grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_340px]" : "mx-auto max-w-4xl"}>
      <div className="min-w-0">
        <div className="player-frame relative aspect-video overflow-hidden rounded-3xl border border-border bg-black shadow-[0_30px_80px_-30px_rgb(var(--accent-rgb)/0.35)]">
          {/* viewfinder corners */}
          <span aria-hidden="true" className="vf vf-tl" />
          <span aria-hidden="true" className="vf vf-tr" />
          <span aria-hidden="true" className="vf vf-bl" />
          <span aria-hidden="true" className="vf vf-br" />

          {playing ? (
            <iframe
              key={current.id}
              src={embedUrl(current)}
              title={current.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${current.title}`}
              className="group absolute inset-0 block h-full w-full"
            >
              <Thumb key={current.id} video={current} hi className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="play-btn relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-[#12162A] transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-start justify-between gap-x-6 gap-y-2 px-1">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{current.title}</h3>
            {current.description && <p className="mt-1.5 max-w-xl text-muted">{current.description}</p>}
          </div>
          <a
            href={current.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm text-muted underline decoration-border underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
          >
            Open on YouTube
          </a>
        </div>
      </div>

      {many && (
        <div className="relative min-h-0 min-w-0">
          <ol className="queue flex gap-3 overflow-x-auto pb-2 lg:absolute lg:inset-0 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 lg:pr-1">
            {videos.map((video, i) => {
              const isActive = i === active;
              return (
                <li key={video.id} className="w-[72%] shrink-0 sm:w-[44%] lg:w-auto">
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group flex w-full gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-accent/50 bg-accent/10 shadow-[0_0_0_1px_rgb(var(--accent-rgb)/0.2)]"
                        : "border-border bg-bg-raised/60 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="relative block aspect-video w-[7.2rem] shrink-0 overflow-hidden rounded-xl bg-black">
                      <Thumb video={video} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {isActive && playing && (
                        <span aria-hidden="true" className="absolute inset-0 flex items-end justify-center gap-[3px] bg-black/50 pb-2.5">
                          <span className="eq eq-1" />
                          <span className="eq eq-2" />
                          <span className="eq eq-3" />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 py-0.5">
                      <span className="block font-mono text-[11px] tabular-nums text-muted">
                        {String(i + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
                      </span>
                      <span className={`mt-1 line-clamp-2 block text-[14px] font-medium leading-snug ${isActive ? "text-ink" : "text-ink/85"}`}>
                        {video.title}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
