/**
 * ============================================================
 *  EDIT THIS FILE TO UPDATE THE WEBSITE
 * ============================================================
 * This is the single place that holds the real content for BOTH
 * apps: Precious (MBBS Quiz Library) and Precious for Residents.
 * Change something here, redeploy (Vercel does this automatically
 * on git push), and the site updates. You should not need to
 * touch component files for routine updates like a new version
 * number, a new screenshot, or a tweaked feature description.
 *
 * Adding a third app later: copy one of the two entries in
 * `apps` below, give it a new unique `slug`, then create
 * `app/<slug>/page.tsx` copying an existing one (e.g.
 * app/precious-for-residents/page.tsx) and swap the slug string.
 * ============================================================
 */

export interface AppVersion {
  version: string;
  versionCode: number;
  releaseDate: string;
  releaseNotes: string;
  // Local /public path (e.g. "/downloads/precious/precious-v1.1.0.apk")
  // or a full https:// URL if hosting the APK elsewhere.
  apkPath: string;
  // Friendly filename used for the actual downloaded file.
  apkFileName: string;
}

export interface AppScreenshot {
  src: string;
  alt: string;
  caption: string;
  // Set true to show a small "New" badge on this screenshot — use for
  // screens introduced in the current latest version, not the whole app.
  isNew?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface StepItem {
  label: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CoverageItem {
  id: string;
  name: string;
  blurb: string;
  // Optional key into the subject color palette (tailwind.config.ts).
  // Leave unset to use the app's themed accent color instead.
  color?: string;
}

export interface AppEntry {
  slug: string;
  theme: "violet" | "teal";
  name: string;
  tagline: string;
  shortDescription: string;
  badge: string;
  minAndroidVersion: string;
  // First entry = latest / current release. Add older entries below it
  // to keep them downloadable under "Previous versions".
  versions: AppVersion[];
  screenshots: AppScreenshot[];
  stats: { value: string; label: string }[];
  featuresHeadline: string;
  features: FeatureItem[];
  stepsHeadline: string;
  steps: StepItem[];
  coverage: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    items: CoverageItem[];
  };
  faq: FaqItem[];
}

export const siteConfig = {
  name: "Precious",
  description: "Two focused apps for doctors in training — from MBBS clinical finals to residency wards.",
  contactEmail: "paitanun35@gmail.com",
};

export const apps: AppEntry[] = [
  // ============================================================
  // APP 1 — Precious (MBBS Quiz Library)
  // ============================================================
  {
    slug: "precious",
    theme: "violet",
    name: "Precious",
    tagline: "Your persistent study companion for clinical finals",
    shortDescription:
      "A focused, offline-first quiz app covering the core MBBS clinical subjects — past questions, topic quizzes, and study materials, organized by subject and synced from the cloud. Now with OSCE Clerking Stations to rehearse the exam format and an AI Study Assistant for quick answers.",
    badge: "Offline-first · Cloud-synced",
    minAndroidVersion: "8.0 (Oreo)",

    versions: [
      {
        version: "1.1.0",
        versionCode: 2,
        releaseDate: "2026-08-06",
        releaseNotes:
          "Added OSCE Clerking Stations with simulated patient histories and a checklist rubric, a built-in AI Study Assistant for quick questions and answer confirmation, and attached study-material PDFs for every subject.",
        apkPath: "/downloads/precious/precious-v1.1.0.apk",
        apkFileName: "Precious-v1.1.0.apk",
      },
      {
        version: "1.0.0",
        versionCode: 1,
        releaseDate: "2026-08-01",
        releaseNotes: "Initial public release.",
        apkPath: "/downloads/precious/precious-v1.0.0.apk",
        apkFileName: "Precious-v1.0.0.apk",
      },
    ],

    screenshots: [
      {
        src: "/screenshots/precious-home.jpg",
        alt: "Precious home dashboard showing overall mastery progress and Global Exam Mode",
        caption: "Your progress at a glance the moment you open the app",
      },
      {
        src: "/screenshots/precious-subjects-materials.jpg",
        alt: "Pediatrics subject screen showing Past Questions, Topic Quizzes, and Study Materials PDFs",
        caption: "Past questions, topic quizzes, and study material PDFs, organized by subject",
      },
      {
        src: "/screenshots/precious-osce.jpg",
        alt: "OSCE Clerking Station showing a timed history-taking case with a checklist rubric",
        caption: "Practice real OSCE-style stations with a timer and an examiner's checklist rubric",
        isNew: true,
      },
      {
        src: "/screenshots/precious-ai-assistant.jpg",
        alt: "AI Study Assistant chat screen for medical questions and quiz answer confirmation",
        caption: "Ask a question or paste quiz options — the AI Study Assistant confirms and explains",
        isNew: true,
      },
    ],

    stats: [
      { value: "5", label: "Clinical subjects" },
      { value: "3", label: "Categories per subject" },
      { value: "100%", label: "Works offline" },
      { value: "Auto", label: "Content updates" },
    ],

    featuresHeadline: "Built for how clinical students actually study",
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
        title: "OSCE Clerking Stations",
        description:
          "Work through timed, simulated-patient history stations with an examiner-style checklist rubric — practice the actual format of the OSCE, not just the facts behind it.",
      },
      {
        title: "AI Study Assistant",
        description:
          "Ask a clinical question or paste a set of quiz options, and get the answer confirmed and explained in context, right inside the app.",
      },
      {
        title: "Global Exam Mode",
        description:
          "Pull questions from every subject into one shuffled, timed-feeling session that mirrors what the real exam actually feels like.",
      },
      {
        title: "Study materials, attached",
        description:
          "Reference lecture notes and PDFs are attached directly to each subject, synced alongside the quizzes so they're there when you need them, even offline.",
      },
      {
        title: "Mastery tracking",
        description:
          "Every question you've seen is scored as got-it, missed, or unseen, rolled up into one clear mastery percentage per subject.",
      },
      {
        title: "Organized by subject",
        description:
          "Past questions, topic quizzes, and study materials are kept cleanly separate within each of the five core clinical subjects, so you always know what you're studying.",
      },
      {
        title: "Built for exam prep",
        description:
          "Shuffle questions, shuffle answers, and choose your session length — 10 quick questions or the full bank.",
      },
    ],

    stepsHeadline: "From download to your first quiz, in four steps",
    steps: [
      { label: "Download", description: "Grab the APK from this page — no Play Store account needed." },
      {
        label: "Install",
        description: "Open the file and allow installs from this source when Android prompts you. It only asks once.",
      },
      {
        label: "Sync",
        description: "Open the app and tap sync. It pulls the current question library over Wi-Fi or data.",
      },
      {
        label: "Study",
        description: "Everything's saved on-device from here — study offline, anytime, at your own pace.",
      },
    ],

    coverage: {
      sectionLabel: "Coverage",
      title: "Five clinical subjects, each fully organized",
      subtitle:
        "Every subject is split into School Past Questions, Topic Quizzes, and Study Materials, kept current through the same cloud sync that powers the rest of the library.",
      items: [
        { id: "peds", name: "Pediatrics", blurb: "Past Questions · Topic Quizzes · Study Materials", color: "peds" },
        {
          id: "og",
          name: "Obstetrics & Gynaecology",
          blurb: "Past Questions · Topic Quizzes · Study Materials",
          color: "og",
        },
        {
          id: "comm",
          name: "Community Medicine",
          blurb: "Past Questions · Topic Quizzes · Study Materials",
          color: "comm",
        },
        { id: "im", name: "Internal Medicine", blurb: "Past Questions · Topic Quizzes · Study Materials", color: "im" },
        { id: "surg", name: "Surgery", blurb: "Past Questions · Topic Quizzes · Study Materials", color: "surg" },
      ],
    },

    faq: [
      {
        question: "Is it safe to install from outside the Play Store?",
        answer:
          "Yes. Because this app is distributed directly rather than through the Play Store, Android will ask you to confirm installing from this source the first time — that's expected, standard behavior for any app installed this way, not a warning specific to this app.",
      },
      {
        question: "Do I need an internet connection to use it?",
        answer: "Only to sync new or updated content. Once a subject is downloaded, everything about studying it works completely offline.",
      },
      {
        question: "How do content updates work?",
        answer:
          "The app checks a small manifest file for the current version of each subject's content. If something's newer than what you have installed, it downloads just that update — not the entire library again.",
      },
      {
        question: "Which subjects are covered?",
        answer:
          "Pediatrics, Obstetrics & Gynaecology, Community Medicine, Internal Medicine, and Surgery — each with School Past Questions, Topic Quizzes, and Study Materials (PDFs).",
      },
      {
        question: "What does the AI Study Assistant do?",
        answer:
          "It answers medical questions in plain language and can confirm the correct option when you paste in a set of quiz choices — useful as a quick sanity check while you study, not a substitute for your course material.",
      },
      {
        question: "How does the OSCE Clerking Station work?",
        answer:
          "Pick a simulated patient history station, set a timer (2–5 minutes), and work through it against a checklist rubric — the same format examiners use, so you practice the structure as well as the content.",
      },
      {
        question: "Will my progress be lost if I update the app?",
        answer: "No. Your mastery progress and answer history are stored locally on your device and are separate from the content library itself.",
      },
    ],
  },

  // ============================================================
  // APP 2 — Precious for Residents
  // ============================================================
  {
    slug: "precious-for-residents",
    theme: "teal",
    name: "Precious for Residents",
    tagline: "Your shift, organized. Your sign-out, ready.",
    shortDescription:
      "A duty-and-sign-out companion for residents — ward tasks tagged by priority and location, structured SBAR hand-over reports you can export as a PDF, and a specialty Board Bank to keep prepping for boards between patients.",
    badge: "Built for the wards",
    minAndroidVersion: "8.0 (Oreo)",

    versions: [
      {
        version: "1.0.0",
        versionCode: 1,
        releaseDate: "2026-08-06",
        releaseNotes:
          "Initial release: location- and priority-tagged ward tasks, SBAR sign-out reports with PDF export, and a specialty Board Bank with Global Board Exam Mode.",
        apkPath: "/downloads/precious-for-residents/precious-for-residents-v1.0.0.apk",
        apkFileName: "Precious-for-Residents-v1.0.0.apk",
      },
    ],

    screenshots: [
      {
        src: "/screenshots/residents-board-bank.jpg",
        alt: "Board Bank screen showing material quizzes, flashcards, and Global Board Exam Mode",
        caption: "Specialty quiz sets, flashcards, and a randomized Global Board Exam Mode",
      },
      {
        src: "/screenshots/residents-sbar-signout.jpg",
        alt: "Patient Sign-Out SBAR screen with a vulnerable patient flagged and a PDF export option",
        caption: "Structured SBAR sign-out reports, flagged for high-risk patients, exportable as a PDF",
      },
      {
        src: "/screenshots/residents-ward-tasks.jpg",
        alt: "Ward Tasks screen with quick task templates and location filters",
        caption: "Ward tasks tagged by location and priority, with quick-add templates for the shift",
      },
    ],

    stats: [
      { value: "4", label: "Core modules" },
      { value: "PDF", label: "SBAR export for hand-off" },
      { value: "Auto", label: "Shift progress tracking" },
      { value: "Global", label: "Board Exam Mode" },
    ],

    featuresHeadline: "Built for how residents actually work on shift",
    features: [
      {
        title: "Ward tasks, organized",
        description:
          "Tasks are tagged by location and priority — STAT, HIGH, or ROUTINE — with quick-add templates for the ones you create every shift, and filters so you only see what's relevant to where you are.",
      },
      {
        title: "SBAR sign-out, ready to hand off",
        description:
          "Build a structured Situation-Background-Assessment-Recommendation report for every patient, flag vulnerable or high-risk cases, and export the full sign-out summary as a PDF.",
      },
      {
        title: "Shift progress at a glance",
        description:
          "A running count of tasks completed this shift, so you and whoever's covering next always know exactly where things stand.",
      },
      {
        title: "Board Bank exam prep",
        description:
          "Specialty-organized quiz sets and due-date flashcards for board prep between patients, plus a randomized Global Board Exam Mode with a custom question limit and timer.",
      },
      {
        title: "Clinical Suite",
        description: "Quick-access clinical tools, one tap from your task list, for the moments you need them at the bedside.",
      },
      {
        title: "Built around your shift",
        description: "Plan your shifts, work your duty list, and hand off a clean sign-out — the whole rotation in one place.",
      },
    ],

    stepsHeadline: "From download to your first sign-out, in four steps",
    steps: [
      { label: "Download", description: "Grab the APK from this page — no Play Store account needed." },
      {
        label: "Install",
        description: "Open the file and allow installs from this source when Android prompts you. It only asks once.",
      },
      {
        label: "Start your shift",
        description: "Add today's ward tasks from a quick template, or write your own — tag each one by location and priority.",
      },
      {
        label: "Sign out clean",
        description: "Build your SBAR report as the shift goes and export it as a PDF the moment you're ready to hand off.",
      },
    ],

    coverage: {
      sectionLabel: "Modules",
      title: "Everything you need for one shift, in one app",
      subtitle: "Four modules cover the shift from start to sign-out — tasks, quick clinical tools, board prep, and your schedule.",
      items: [
        { id: "duty", name: "Duty Routine", blurb: "Ward tasks tagged by location and priority, plus SBAR sign-out reports" },
        { id: "clinical", name: "Clinical Suite", blurb: "Quick-access clinical tools for bedside work" },
        { id: "board", name: "Board Bank", blurb: "Specialty quiz sets, flashcards, and Global Board Exam Mode" },
        { id: "shifts", name: "Shifts", blurb: "Plan and view your upcoming shift schedule" },
      ],
    },

    faq: [
      {
        question: "Is it safe to install from outside the Play Store?",
        answer:
          "Yes. Because this app is distributed directly rather than through the Play Store, Android will ask you to confirm installing from this source the first time — that's expected, standard behavior for any app installed this way, not a warning specific to this app.",
      },
      {
        question: "What is an SBAR sign-out report?",
        answer:
          "SBAR (Situation, Background, Assessment, Recommendation) is a structured way to hand a patient off to the next team. The app builds one per patient and lets you export the full sign-out as a PDF.",
      },
      {
        question: "What's in the Board Bank?",
        answer:
          "Specialty quiz sets and flashcards you can work through between patients, plus a Global Board Exam Mode that randomizes questions across everything with its own question limit and timer.",
      },
      {
        question: "Can I use quick templates for common tasks?",
        answer: "Yes — save any recurring task, like a common consult or line placement, as a template so adding it to a future shift is one tap.",
      },
      {
        question: "Is this affiliated with my hospital or program?",
        answer:
          "No — this is an independent tool built to make one resident's shift easier, not an official system from any hospital or residency program.",
      },
    ],
  },
];
