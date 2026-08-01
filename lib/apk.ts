import fs from "fs";
import path from "path";
import { appConfig } from "@/config/app.config";

export interface ApkInfo {
  url: string;
  fileName: string;
  sizeLabel: string | null;
}

function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`;
}

/**
 * Resolves download info for the APK.
 * - If apkPath is an external URL (http/https), size isn't read locally
 *   (nothing to stat) — it just links straight to it.
 * - If apkPath is a local /public path, the real file size is read from
 *   disk automatically, so replacing the file keeps the displayed size
 *   accurate with zero manual edits.
 */
export function getApkInfo(): ApkInfo {
  const { apkPath, apkFileName } = appConfig;
  const isExternal = /^https?:\/\//i.test(apkPath);

  if (isExternal) {
    return { url: apkPath, fileName: apkFileName, sizeLabel: null };
  }

  try {
    const filePath = path.join(process.cwd(), "public", apkPath.replace(/^\//, ""));
    const stats = fs.statSync(filePath);
    return {
      url: apkPath,
      fileName: apkFileName,
      sizeLabel: formatBytes(stats.size),
    };
  } catch {
    // File not placed yet — page still renders, just without a size badge.
    return { url: apkPath, fileName: apkFileName, sizeLabel: null };
  }
}
