import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0D16",
        surface: "#131826",
        "surface-hi": "#1A2133",
        border: "#242C42",
        ink: "#F4F6FB",
        muted: "#98A2B8",
        // Values come from CSS custom properties set in globals.css so the
        // same components can re-theme per app (see .theme-teal there).
        // Default (:root) is Precious' violet; wrap a subtree in
        // className="theme-teal" for Precious for Residents.
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          strong: "rgb(var(--accent-strong-rgb) / <alpha-value>)",
          soft: "rgb(var(--accent-soft-rgb) / <alpha-value>)",
        },
        subject: {
          peds: { bg: "#D9F0DC", fg: "#2F7D46" },
          og: { bg: "#F3D9EC", fg: "#8B3E8F" },
          comm: { bg: "#D7E8FB", fg: "#2E6FB0" },
          im: { bg: "#D2ECE4", fg: "#1E7A5F" },
          surg: { bg: "#FBE3CB", fg: "#C15B1D" },
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "glow-accent":
          "radial-gradient(60% 60% at 50% 40%, rgb(var(--accent-rgb) / 0.25) 0%, rgb(var(--accent-rgb) / 0) 70%)",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
        phone: "0 30px 80px -20px rgba(0,0,0,0.7)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--tilt, 0deg))" },
          "50%": { transform: "translateY(-14px) rotate(var(--tilt, 0deg))" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
