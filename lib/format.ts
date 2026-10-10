/** "2026-10-17" -> "17 Oct 2026" (stable, no timezone surprises). */
export function formatDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[Number(m[2]) - 1];
  return month ? `${Number(m[3])} ${month} ${m[1]}` : iso;
}

/** "8.0 (Oreo)" -> "Android 8.0+" */
export function androidLabel(min: string): string {
  return `Android ${min.replace(/\s*\(.*\)\s*$/, "").trim()}+`;
}
