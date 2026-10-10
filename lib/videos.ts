import { parseYouTube } from "@/lib/youtube";
import type { VideoInput } from "@/config/videos";

/**
 * Server-side: turns the plain list of links in config/videos.ts into
 * everything the page needs (id, title, thumbnails, embed address).
 *
 * Titles come straight from YouTube (its public oEmbed endpoint, no key
 * needed) at build time. If YouTube can't be reached, the page still
 * builds and shows a neutral title instead of failing.
 */

export interface Video {
  id: string;
  start?: number;
  title: string;
  description?: string;
  /** Always-available medium thumbnail. */
  thumb: string;
  /** Sharper thumbnail, used for the big player (may not exist for old videos). */
  thumbHi: string;
  watchUrl: string;
}

async function fetchTitle(id: string): Promise<string | null> {
  try {
    const endpoint = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${id}`
    )}`;
    const res = await fetch(endpoint, {
      cache: "force-cache",
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { title?: unknown };
    return typeof data.title === "string" && data.title.trim() ? data.title.trim() : null;
  } catch {
    return null;
  }
}

export async function resolveVideos(inputs: VideoInput[]): Promise<Video[]> {
  const seen = new Set<string>();
  const entries: { id: string; start?: number; title?: string; description?: string }[] = [];

  for (const input of inputs) {
    const url = typeof input === "string" ? input : input.url;
    const parsed = parseYouTube(url);
    if (!parsed) {
      console.warn(`[videos] Skipping "${url}" — not a recognisable YouTube link.`);
      continue;
    }
    if (seen.has(parsed.id)) continue;
    seen.add(parsed.id);
    entries.push({
      ...parsed,
      title: typeof input === "string" ? undefined : input.title,
      description: typeof input === "string" ? undefined : input.description,
    });
  }

  return Promise.all(
    entries.map(async (entry, i) => {
      const title = entry.title ?? (await fetchTitle(entry.id)) ?? `Walkthrough ${i + 1}`;
      return {
        id: entry.id,
        start: entry.start,
        title,
        description: entry.description,
        thumb: `https://i.ytimg.com/vi/${entry.id}/hqdefault.jpg`,
        thumbHi: `https://i.ytimg.com/vi/${entry.id}/maxresdefault.jpg`,
        watchUrl: `https://www.youtube.com/watch?v=${entry.id}`,
      };
    })
  );
}
