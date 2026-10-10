import { renderOg, ogSize } from "@/lib/og";
import { siteConfig } from "@/config/apps";

export const size = ogSize;
export const contentType = "image/png";
export const alt = siteConfig.name;

export default function Image() {
  return renderOg({ title: siteConfig.name, subtitle: siteConfig.description, accent: "#AEB8F5" });
}
