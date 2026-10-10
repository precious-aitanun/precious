import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Social-share card: dark panel, the app's colour, a heartbeat line. */
export function renderOg({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0A0D16",
          backgroundImage: `radial-gradient(circle at 85% 20%, ${accent}33 0%, transparent 55%)`,
          color: "#F4F6FB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: accent }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: accent }} />
          Medical study &amp; duty apps
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 38, color: "#9AA4BA", maxWidth: 900, lineHeight: 1.25 }}>{subtitle}</div>
        </div>

        <svg width="1056" height="90" viewBox="0 0 1056 90" fill="none">
          <path
            d="M0 52 H230 L248 52 L262 38 L276 52 H330 L346 58 L362 6 L380 84 L394 52 H470 C490 52 498 28 520 28 C542 28 548 52 568 52 H1056"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    ogSize
  );
}
