/** Subject colours, shared by Tailwind and the canvas animation. */
export const subjectPalette = {
  peds: { bg: "#D9F0DC", fg: "#2F7D46", glow: "#6FD18A" },
  og: { bg: "#F3D9EC", fg: "#8B3E8F", glow: "#E08AD9" },
  comm: { bg: "#D7E8FB", fg: "#2E6FB0", glow: "#6FB1F2" },
  im: { bg: "#D2ECE4", fg: "#1E7A5F", glow: "#5FD1B0" },
  surg: { bg: "#FBE3CB", fg: "#C15B1D", glow: "#F5A15E" },
} as const;

export type SubjectKey = keyof typeof subjectPalette;
