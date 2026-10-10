# Precious: your app store site

This is the website where people discover and download **Precious** and
**Precious for Residents**.

| Page | Address |
|---|---|
| Home (both apps) | `/` |
| Precious | `/precious` |
| Precious for Residents | `/precious-for-residents` |

You do not need to touch any design or code to keep it up to date. Almost
everything you will ever change is in one of two files:

- **`config/videos.ts`** – the walkthrough videos
- **`config/apps.ts`** – everything else (text, versions, features, FAQ, email)

---

## 1. Add a video (30 seconds)

1. Upload your video to YouTube as usual.
2. Copy its link.
3. Open **`config/videos.ts`** and paste the link as a new line inside the
   list for the right app:

   ```ts
   precious: [
     "https://youtu.be/AbCdEfGhIjK",
     "https://youtu.be/LmNoPqRsTuV",   // <- a new one, just add a line
   ],
   ```

4. Save and publish (see "Publishing" below).

That's all. The site makes the video player, the thumbnail and the title by
itself, and it takes the title straight from YouTube. The first video on the
list opens first. The rest appear as a playlist beside it (or below it on a
phone). Put videos in the order you want people to watch them.

- **Any YouTube link works**: the share link, the address-bar link, a Short,
  or a link that starts part-way in (like `...&t=90s`).
- **Want your own title or a one-line description?** Use the longer form for
  that one video:

  ```ts
  { url: "https://youtu.be/AbCdEfGhIjK",
    title: "Your own title",
    description: "One line about what this video covers." },
  ```

- **Remove a video:** delete its line.
- **No videos for an app?** Leave its list empty (`[]`). The video section and
  its menu link then disappear on their own. This is how
  **Precious for Residents** is set up for now. When you have its first video,
  paste the link into the `"precious-for-residents"` list.
- **Fast and privacy-friendly:** videos use YouTube's privacy-enhanced
  player, and a video only loads when someone presses play, so the page stays
  fast.

---

## 2. Put the APKs back

The APK files are not in this folder (you removed them to keep it small).
Before you publish, add them back in **exactly** these places and with exactly
these names:

| File name | Put it in |
|---|---|
| `precious-v1.2.0.apk` (latest) | `public/downloads/precious/` |
| `precious-v1.1.0.apk` | `public/downloads/precious/` |
| `precious-v1.0.0.apk` | `public/downloads/precious/` |
| `precious-for-residents-v1.0.0.apk` | `public/downloads/precious-for-residents/` |

Each folder has a `PUT_APK_HERE.txt` note. Delete it once the files are in.

- The big **Download APK** button always gives people the **latest** version.
  Older ones sit under **Previous versions**.
- The file size on the page is read from the real file, so you never type it.
- If an APK is missing, the page shows a friendly "Download unavailable" box
  with your email instead of a broken button. If you see that on the live
  site, a file is missing or misnamed.

**Prefer to host the APKs somewhere else** (for example Cloudflare R2, so you
don't redeploy the site to ship a build)? In `config/apps.ts`, replace that
version's `apkPath` with the full web address of the file.

---

## 3. Release a new version of an app

1. Add the new APK file (e.g. `precious-v1.3.0.apk`) to the right downloads
   folder.
2. In `config/apps.ts`, find that app's `versions` list and add a new block at
   the **very top**. Copy the one below it and change the details:

   ```ts
   {
     version: "1.3.0",
     releaseDate: "2026-11-20",
     releaseNotes: "A short, plain-English summary of what's new.",
     apkPath: "/downloads/precious/precious-v1.3.0.apk",
     apkFileName: "Precious-v1.3.0.apk",
   },
   ```

3. Publish. The new version becomes the main download; the old one moves into
   "Previous versions" automatically.

---

## 4. Change the words on the site

Open **`config/apps.ts`**. Each app has a section for each thing you see on
its page. Just edit the text between the quotation marks.

| To change… | Look for… |
|---|---|
| App name, headline, short description | the top of that app's block |
| The little highlights under the headline | `badges` |
| The four numbers under the headline | `stats` |
| Feature cards | `features` (keep the `icon` word; it picks the picture) |
| The subjects (Precious) or modules (Residents) | `coverage` |
| "How it works" steps | `steps` |
| FAQ | `faq` |
| Contact email (shows in the footer and in the "download unavailable" box) | `contactEmail` near the top |

**Screenshots:** Precious uses videos instead of screenshots now. Precious for
Residents still uses screenshots: put new image files in `public/screenshots/`
and list them under that app's `screenshots`. If an app has no screenshots,
that section hides itself.

---

## Preview on your computer

You only need this if you want to see changes before they go live.

1. Install [Node.js](https://nodejs.org) (the "LTS" version) once.
2. In this folder, run `npm install` (first time only), then `npm run dev`.
3. Open http://localhost:3000.

Stop it any time with `Ctrl + C`.

## Publishing

Push your changes to GitHub. Vercel notices and updates the live site in a
minute or two. If you've connected a custom domain, nothing else changes.

> **Tip:** set an environment variable called `NEXT_PUBLIC_SITE_URL` in Vercel
> to your real address (for example `https://precious.me.uk`). It makes link
> previews on WhatsApp, X and Google show the right address.

## If something looks wrong

| What you see | Most likely cause |
|---|---|
| "Download unavailable" on a page | The APK file is missing or its name doesn't match the table above |
| A video doesn't appear | The link is mistyped, or it's a channel/playlist link rather than one video's link. The site quietly skips links it can't recognise, so check the build log for a "Skipping" message |
| A video shows "Walkthrough 1" as its title | YouTube couldn't be reached when the site was built. Publish again, or give the video its own `title` (see section 1) |
| The site won't publish | A comma, quote or bracket got lost while editing. Compare with the line above it |

Not sure? Undo your last change and publish again. Everything is saved in
GitHub, so nothing is ever lost.
