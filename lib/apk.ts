import fs from "fs";
import path from "path";
import type { AppVersion } from "@/config/apps";

export interface ApkInfo {
  url: string;
  fileName: string;
  sizeLabel: string | null;
  /** False when a local APK file hasn't been added yet. */
  available: boolean;
}

function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`;
}

/**
 * Resolves download info for one APK version.
 * - External link (https://…): used as-is.
 * - File in /public: the real size is read at build time, and if the file
 *   isn't there yet the page shows a clear "not available" state instead of
 *   a broken download button.
 */
export function getApkInfo(version: AppVersion): ApkInfo {
  const { apkPath, apkFileName } = version;

  if (/^https?:\/\//i.test(apkPath)) {
    return { url: apkPath, fileName: apkFileName, sizeLabel: null, available: true };
  }

  try {
    const filePath = path.join(process.cwd(), "public", apkPath.replace(/^\//, ""));
    const stats = fs.statSync(filePath);
    return { url: apkPath, fileName: apkFileName, sizeLabel: formatBytes(stats.size), available: true };
  } catch {
    return { url: apkPath, fileName: apkFileName, sizeLabel: null, available: false };
  }
}

export function getApkInfos(versions: AppVersion[]): ApkInfo[] {
  return versions.map(getApkInfo);
}
