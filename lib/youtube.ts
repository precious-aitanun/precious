/**
 * Turns whatever YouTube link you paste into a clean video id (and an
 * optional start time). Pure functions, no network — safe anywhere.
 */

export interface ParsedYouTube {
  id: string;
  /** Start offset in seconds, if the link had one (e.g. &t=90s). */
  start?: number;
}

const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const YT_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

/** "90", "90s", "1m30s", "1h2m3s" -> seconds. */
export function parseTimestamp(raw: string | null | undefined): number | undefined {
  if (!raw) return undefined;
  const value = raw.trim().toLowerCase();
  if (/^\d+$/.test(value)) return Number(value) || undefined;
  const m = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!m || (!m[1] && !m[2] && !m[3])) return undefined;
  const seconds = Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
  return seconds > 0 ? seconds : undefined;
}

export function parseYouTube(input: string): ParsedYouTube | null {
  const raw = input.trim();
  if (!raw) return null;

  if (ID_PATTERN.test(raw)) return { id: raw };

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  const parts = url.pathname.split("/").filter(Boolean);
  let id: string | undefined;

  if (host === "youtu.be") {
    id = parts[0];
  } else if (YT_HOSTS.has(host)) {
    if (url.pathname === "/watch" || parts[0] === "watch") id = url.searchParams.get("v") ?? undefined;
    else if (["embed", "shorts", "live", "v"].includes(parts[0])) id = parts[1];
  }

  if (!id || !ID_PATTERN.test(id)) return null;

  const start = parseTimestamp(url.searchParams.get("t") ?? url.searchParams.get("start"));
  return start ? { id, start } : { id };
}
