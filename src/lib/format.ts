/** Full machine timestamp: 2026-06-18 23:40:12 (matches the design's log rows). */
export function fmtStamp(iso: string): string {
  return new Date(iso).toISOString().replace("T", " ").slice(0, 19);
}

/** Short date: "Jun 18, 2026". UTC-pinned for reproducible static builds. */
export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

/** Long date: "June 18, 2026". */
export function fmtLong(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Date + time, 24h: "Jun 18, 2026, 23:40". */
export function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
}
