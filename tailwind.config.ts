import type { Config } from "tailwindcss";
import { subjectPalette } from "./lib/palette";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./config/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0D16",
        "bg-raised": "#0F1320",
        surface: "#131826",
        "surface-hi": "#1A2133",
        border: "#242C42",
        ink: "#F4F6FB",
        muted: "#9AA4BA",
        // Values come from CSS custom properties set in globals.css so the
        // same components re-theme per app (see .theme-teal there).
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          strong: "rgb(var(--accent-strong-rgb) / <alpha-value>)",
          soft: "rgb(var(--accent-soft-rgb) / <alpha-value>)",
        },
        subject: Object.fromEntries(Object.entries(subjectPalette).map(([k, v]) => [k, { bg: v.bg, fg: v.fg }])),
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "glow-accent": "radial-gradient(60% 60% at 50% 30%, rgb(var(--accent-rgb) / 0.22) 0%, rgb(var(--accent-rgb) / 0) 70%)",
      },
      transitionDuration: { 400: "400ms" },
    },
  },
  plugins: [],
};

export default config;
