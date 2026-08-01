# MBBS Quiz Library — Landing Page

A Next.js + Tailwind landing page for the MBBS Quiz Library Android app:
overview, screenshots, features, and a direct APK download.

## Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repo (or use `vercel` CLI
   directly on this folder).
2. Import the repo at https://vercel.com/new.
3. No configuration needed — Vercel auto-detects Next.js and it just works.

That's it. No environment variables, no build settings to touch.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where to put the APK

Drop your APK file at:

```
public/downloads/app-latest.apk
```

The download button already points here by default, and the file size shown
on the page (e.g. "24 MB") is read automatically from the real file — you
never have to type a size in manually.

**Alternative — host it externally instead** (recommended once the file gets
large, or if you'd rather not redeploy the whole site just to ship a new
build): open `config/app.config.ts` and set `apkPath` to a full URL, e.g.
your existing Cloudflare R2 bucket:

```ts
apkPath: "https://pub-xxxxxxxx.r2.dev/downloads/app-latest.apk",
```

When `apkPath` is a full `http(s)://` URL, the button links straight there
instead of looking for a local file.

## Updating content

Everything editable lives in **`config/app.config.ts`** — one file, plainly
commented. You should not need to touch component code for routine updates:

| To change...                          | Edit...                                    |
|----------------------------------------|---------------------------------------------|
| App name, tagline, description         | `config/app.config.ts` → top fields          |
| Version number / release date          | `config/app.config.ts` → version fields      |
| Screenshots                            | Add files to `public/screenshots/`, list them in `config/app.config.ts` → `screenshots` |
| Features list                          | `config/app.config.ts` → `features`          |
| Subjects covered                       | `config/app.config.ts` → `subjects`          |
| "How it works" steps                   | `config/app.config.ts` → `steps`             |
| FAQ                                    | `config/app.config.ts` → `faq`               |
| APK file / download link               | see "Where to put the APK" above             |
| Contact email                          | `config/app.config.ts` → `contactEmail`      |

Push to your git remote and Vercel redeploys automatically.

## Project structure

```
app/                Next.js App Router pages, layout, global styles
components/          All page sections (Hero, Features, Screenshots, etc.)
config/app.config.ts All editable site content — start here
lib/apk.ts           Reads the real APK file size automatically
public/screenshots/  App screenshots shown on the page
public/downloads/    Put app-latest.apk here (see above)
```

## Design notes

Colors, type, and the subject-icon palette are pulled directly from the
actual app's UI (dark navy background, periwinkle accent, pastel subject
icons) so the site reads as a natural extension of the product rather than
a generic template layered on top of it.

- Display type: Space Grotesk
- Body type: IBM Plex Sans
- Mono/data type: IBM Plex Mono (used for version numbers, file size, stats)
