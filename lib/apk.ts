import fs from "fs";
import path from "path";
import type { AppVersion } from "@/config/apps";

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
 * Resolves download info for a single APK version.
 * - If apkPath is an external URL (http/https), size isn't read locally
 *   (nothing to stat) — it just links straight to it.
 * - If apkPath is a local /public path, the real file size is read from
 *   disk automatically, so replacing the file keeps the displayed size
 *   accurate with zero manual edits. If the file hasn't been placed yet,
 *   the page still renders fine, just without a size badge.
 */
export function getApkInfo(version: AppVersion): ApkInfo {
  const { apkPath, apkFileName } = version;
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
    return { url: apkPath, fileName: apkFileName, sizeLabel: null };
  }
}

/** Resolves download info for every version of an app, latest first. */
export function getApkInfos(versions: AppVersion[]): ApkInfo[] {
  return versions.map(getApkInfo);
}
