import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/apps";
import { siteUrl } from "@/lib/site";

// Fonts are bundled with the site (no calls to Google at build or run time).
const display = localFont({
  src: "./fonts/BricolageGrotesque-Variable.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});
const body = localFont({
  src: "./fonts/InstrumentSans-Variable.woff2",
  variable: "--font-body",
  weight: "400 700",
  display: "swap",
});
const mono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteConfig.name}: ${siteConfig.description}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
};

export const viewport: Viewport = {
  themeColor: "#0A0D16",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/* If JavaScript is off, never leave content hidden waiting for an animation. */}
        <noscript>
          <style>{`.rv,.hero-in{opacity:1!important;transform:none!important}.sw-in{transform:none!important}.draw path{stroke-dashoffset:0!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
