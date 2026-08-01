/**
 * ============================================================
 *  EDIT THIS FILE TO UPDATE THE WEBSITE
 * ============================================================
 * This is the single place that holds all of the site's real
 * content: app info, version, features, subjects, screenshots,
 * and FAQ copy. Change something here, redeploy (Vercel does
 * this automatically on git push), and the site updates.
 *
 * You should NOT need to touch any component files for routine
 * updates like a new version number, a new screenshot, or a
 * tweaked feature description.
 * ============================================================
 */

export const appConfig = {
  // ---- Basic identity -----------------------------------------------
  name: "MBBS Quiz Library",
  tagline: "Your persistent study companion for clinical finals",
  shortDescription:
    "A focused, offline-first quiz app covering the core MBBS clinical subjects — past questions and study materials, organized by subject, synced from the cloud so your library is always current.",

  // ---- Version / release info -----------------------------------------
  // Update these whenever you ship a new APK build.
  version: "1.0.0",
  versionCode: 1,
  releaseNotes: "Initial public release.",
  releaseDate: "2026-08-01",
  minAndroidVersion: "8.0 (Oreo)",

  // ---- APK download ----------------------------------------------------
  // OPTION A (default): drop the file at /public/downloads/app-latest.apk
  //   and leave this as the local path below. File size on the site is
  //   read automatically from the actual file — no manual size field.
  // OPTION B: host the APK elsewhere (e.g. your existing Cloudflare R2
  //   bucket) and paste the full URL here instead, e.g.
  //   "https://pub-xxxxxxxx.r2.dev/downloads/app-latest.apk"
  //   This is recommended once the APK gets large, since it avoids
  //   bundling a big binary into every Vercel deployment.
  apkPath: "/downloads/app-latest.apk",
  apkFileName: "MBBS-Quiz-Library.apk",

  // ---- Screenshots -------------------------------------------------------
  // Add/remove/reorder freely. Files live in /public/screenshots/.
  // Recommended source size: real device screenshots, any resolution —
  // they're displayed inside a phone frame so they get cropped to fit.
  screenshots: [
    {
      src: "/screenshots/screenshot-home.jpg",
      alt: "Home screen showing overall mastery progress and the subject list",
      caption: "Track your mastery across every subject at a glance",
    },
    {
      src: "/screenshots/screenshot-subjects.jpg",
      alt: "Clinical subjects list with Global Exam Mode",
      caption: "Five clinical subjects, organized and ready to study",
    },
    {
      src: "/screenshots/screenshot-exam.jpg",
      alt: "Exam configuration screen for a mixed exam session",
      caption: "Simulate the real exam with a shuffled, mixed question pool",
    },
  ],

  // ---- Subjects ------------------------------------------------------
  // Colors reference the `subject.*` palette defined in tailwind.config.ts
  subjects: [
    { id: "peds", name: "Pediatrics", color: "peds" },
    { id: "og", name: "Obstetrics & Gynaecology", color: "og" },
    { id: "comm", name: "Community Medicine", color: "comm" },
    { id: "im", name: "Internal Medicine", color: "im" },
    { id: "surg", name: "Surgery", color: "surg" },
  ],

  // ---- Features --------------------------------------------------------
  features: [
    {
      title: "Cloud-synced content",
      description:
        "New past questions and study materials publish to the cloud and reach your device automatically — the app checks for updates and downloads only what's changed, not the whole library again.",
    },
    {
      title: "Study fully offline",
      description:
        "Once synced, everything works with no signal at all. Read on the ward, revise on a flight, quiz yourself anywhere.",
    },
    {
      title: "Global Exam Mode",
      description:
        "Pull questions from every subject into one shuffled, timed-feeling session that mirrors what the real exam actually feels like.",
    },
    {
      title: "Mastery tracking",
      description:
        "Every question you've seen is scored as got-it, missed, or unseen, rolled up into one clear mastery percentage per subject.",
    },
    {
      title: "Organized by subject",
      description:
        "Past questions and study materials are kept cleanly separate within each of the five core clinical subjects, so you always know what you're studying.",
    },
    {
      title: "Built for exam prep",
      description:
        "Shuffle questions, shuffle answers, and choose your session length — 10 quick questions or the full bank.",
    },
  ],

  // ---- How it works ----------------------------------------------------
  steps: [
    {
      label: "Download",
      description: "Grab the APK from this page — no Play Store account needed.",
    },
    {
      label: "Install",
      description:
        "Open the file and allow installs from this source when Android prompts you. It only asks once.",
    },
    {
      label: "Sync",
      description:
        "Open the app and tap sync. It pulls the current question library over Wi-Fi or data.",
    },
    {
      label: "Study",
      description:
        "Everything's saved on-device from here — study offline, anytime, at your own pace.",
    },
  ],

  // ---- FAQ ---------------------------------------------------------------
  faq: [
    {
      question: "Is it safe to install from outside the Play Store?",
      answer:
        "Yes. Because this app is distributed directly rather than through the Play Store, Android will ask you to confirm installing from this source the first time — that's expected, standard behavior for any app installed this way, not a warning specific to this app.",
    },
    {
      question: "Do I need an internet connection to use it?",
      answer:
        "Only to sync new or updated content. Once a subject is downloaded, everything about studying it works completely offline.",
    },
    {
      question: "How do content updates work?",
      answer:
        "The app checks a small manifest file for the current version of each subject's content. If something's newer than what you have installed, it downloads just that update — not the entire library again.",
    },
    {
      question: "Which subjects are covered?",
      answer:
        "Pediatrics, Obstetrics & Gynaecology, Community Medicine, Internal Medicine, and Surgery, each split into Past Questions and Subject Materials.",
    },
    {
      question: "Will my progress be lost if I update the app?",
      answer:
        "No. Your mastery progress and answer history are stored locally on your device and are separate from the content library itself.",
    },
  ],

  // ---- Footer / contact -----------------------------------------------
  // Replace with your real details before publishing.
  contactEmail: "support@example.com",
  socialLinks: [] as { label: string; url: string }[],
};

export type AppConfig = typeof appConfig;
