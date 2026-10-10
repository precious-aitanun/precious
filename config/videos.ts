/**
 * ============================================================
 *  ADD A NEW VIDEO HERE — THIS IS THE ONLY PLACE
 * ============================================================
 * Upload your video to YouTube, copy its link, and paste it as a
 * new line in the list for the right app. That's it. The website
 * builds the player, the thumbnail and the title by itself.
 *
 *   "https://youtu.be/AbCdEfGhIjK",
 *
 * Any kind of YouTube link works (youtu.be, youtube.com/watch,
 * shorts, embed, links with &t=90s to start part-way in).
 *
 * Videos appear in the order you list them, so put them in the
 * order you want people to watch them.
 *
 * Want to choose your own title or add a one-line description?
 * Use the longer form for that one video:
 *
 *   { url: "https://youtu.be/AbCdEfGhIjK",
 *     title: "Your own title",
 *     description: "One line about what this video covers." },
 *
 * If an app has no videos (an empty list), its video section
 * simply doesn't appear.
 * ============================================================
 */

export type VideoInput =
  | string
  | {
      url: string;
      // Leave out to use the real YouTube title automatically.
      title?: string;
      description?: string;
    };

export const videos: Record<string, VideoInput[]> = {
  // ---- Precious ------------------------------------------------------
  precious: [
    "https://youtu.be/HL1yd-z8FMs?si=WCEPFoyCX5ju1fON",
    "https://youtube.com/shorts/yC29NNR5DKQ?si=-SvtRBSOg-ciR8XD",
    "https://youtube.com/shorts/evPppq_3SZo?si=em0Xmfjw5itWXQDk",
    "https://youtube.com/shorts/83Nef80t1yU?si=LcorM8MY1VW69qCN",

  ],

  // ---- Precious for Residents (no videos yet) ----------------------------
  "precious-for-residents": [],
};
