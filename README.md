# Precious — Apps Landing Site

A Next.js + Tailwind landing site for **two** Android apps:

- **Precious** (MBBS Quiz Library) — `/precious`
- **Precious for Residents** — `/precious-for-residents`

The homepage (`/`) is a hub that links to both. Each app has its own full
page (hero, features, screenshots, download, FAQ) built from the same
shared components, just themed differently — periwinkle for Precious,
teal for Precious for Residents.

## Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repo (or use `vercel` CLI
   directly on this folder).
2. Import the repo at https://vercel.com/new.
3. No configuration needed — Vercel auto-detects Next.js and it just works.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where to put the APKs

Three files, three exact locations:

| File | Goes in | What it is |
|---|---|---|
| `precious-v1.1.0.apk` | `public/downloads/precious/` | Precious — latest (OSCE + AI Study Assistant + study material PDFs update) |
| `precious-v1.0.0.apk` | `public/downloads/precious/` | Precious — previous release (rename your existing `app-latest.apk` to this) |
| `precious-for-residents-v1.0.0.apk` | `public/downloads/precious-for-residents/` | Precious for Residents — first release |

Each folder has a `PUT_APK_HERE.txt` with the same instructions — delete
those once the real files are in place.

The main **Download APK** button on each app page always serves that
app's latest version. Older versions (right now, just Precious v1.0.0)
appear under a "Previous versions" toggle in the download section, so
existing users can still grab the old build if needed. File size shown
on the page is read automatically from the real file at build time —
never typed in manually.

**Alternative — host APKs externally instead** (recommended once files
get large, or if you'd rather not redeploy the whole site to ship a new
build): open `config/apps.ts` and set that version's `apkPath` to a full
URL, e.g. your Cloudflare R2 bucket:

```ts
apkPath: "https://pub-xxxxxxxx.r2.dev/downloads/precious-v1.1.0.apk",
```

## Updating content

Everything editable for **both apps** lives in **`config/apps.ts`** — one
file, plainly commented, with an `apps` array (Precious is `apps[0]`,
Precious for Residents is `apps[1]`) plus a shared `siteConfig` (site
name, hub description, contact email). You should not need to touch
component code for routine updates:

| To change... | Edit... |
|---|---|
| App name, tagline, description | `config/apps.ts` → that app's top fields |
| Version number / release notes / release date | `config/apps.ts` → that app's `versions` array (add a new entry at the **top** to ship an update; old entries automatically become "Previous versions") |
| Screenshots | Add files to `public/screenshots/`, list them in that app's `screenshots` array |
| Features | That app's `features` array |
| Subjects (Precious) / Modules (Residents) | That app's `coverage.items` array |
| "How it works" steps | That app's `steps` array |
| FAQ | That app's `faq` array |
| APK files | See "Where to put the APKs" above |
| Contact email | `siteConfig.contactEmail` (shared across both apps + the hub) |

Push to your git remote and Vercel redeploys automatically.

### Adding a third app later

1. Copy one of the two entries in the `apps` array in `config/apps.ts`,
   give it a unique `slug`, and fill in its content.
2. Copy `app/precious-for-residents/page.tsx` to
   `app/<your-slug>/page.tsx` and swap the `slug` string it looks up.
3. If you want it in its own color, add a `.theme-<name>` block in
   `app/globals.css` (copy the `.theme-teal` block) and wrap that page's
   content in `<div className="theme-<name>">` the same way the Residents
   page does.
4. Add a card for it on the hub (`app/page.tsx`).

## Project structure

```
app/                         Next.js App Router
  page.tsx                   Hub — links to both apps
  precious/page.tsx           Precious app page
  precious-for-residents/page.tsx   Precious for Residents app page
  layout.tsx, globals.css     Shared shell, fonts, theme variables
components/                  All page sections — each takes an `app` prop
config/apps.ts               All editable content for both apps — start here
lib/apk.ts                   Reads real APK file sizes automatically
public/screenshots/          App screenshots
public/downloads/precious/                  Precious APKs go here
public/downloads/precious-for-residents/    Precious for Residents APK goes here
```

## Design notes

Colors, type, and the subject/module icon palette are pulled from the
actual apps' UI (dark navy background, pastel subject icons) so the site
reads as a natural extension of the products. Both apps share one dark
navy background; only the accent color switches per app via a CSS
variable (`--accent-rgb` etc., set in `app/globals.css` and toggled by a
`.theme-teal` wrapper) — periwinkle for Precious, teal for Precious for
Residents.

- Display type: Space Grotesk
- Body type: IBM Plex Sans
- Mono/data type: IBM Plex Mono (used for version numbers, file size, stats)
