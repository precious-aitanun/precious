import type { IconName } from "@/config/apps";

/**
 * Line icons that "draw themselves" when their parent gets data-in="true"
 * (see .draw in globals.css). Every path uses pathLength=1 so one CSS rule
 * animates them all.
 */
const paths: Record<IconName, string[]> = {
  sync: ["M20 11a8 8 0 0 0-14.3-4.5L4 8.5", "M4 4v4.5h4.5", "M4 13a8 8 0 0 0 14.3 4.5L20 15.5", "M20 20v-4.5h-4.5"],
  offline: ["M2 9a15 15 0 0 1 20 0", "M5.5 12.5a10 10 0 0 1 13 0", "M9 16a5 5 0 0 1 6 0", "M12 19.5h.01", "M3 3l18 18"],
  osce: ["M9 4h6l1 2h2.5a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 18.5 21h-13A1.5 1.5 0 0 1 4 19.5v-12A1.5 1.5 0 0 1 5.5 6H8z", "M8.5 13l2.3 2.3 4.7-4.8"],
  ai: ["M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z", "M19 16v4", "M17 18h4", "M5 3v3", "M3.5 4.5h3"],
  exam: ["M2 9l10-5 10 5-10 5z", "M6 11.2v4.6c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.6", "M22 9v6"],
  mastery: ["M12 3a9 9 0 1 0 9 9", "M12 7.5V12l3 2", "M17 3.5a9 9 0 0 1 3.5 3.5"],
  tasks: ["M9 6h11", "M9 12h11", "M9 18h11", "M3.5 6l1.3 1.3L7 5", "M3.5 12l1.3 1.3L7 11", "M3.5 18l1.3 1.3L7 17"],
  sbar: ["M6 3h8l5 5v13H6z", "M14 3v5h5", "M9 12h7", "M9 15.5h7", "M9 19h4"],
  progress: ["M4 20V10", "M10 20V4", "M16 20v-7", "M22 20H2"],
  board: ["M12 3l9 4.5-9 4.5-9-4.5z", "M3 12l9 4.5 9-4.5", "M3 16.5L12 21l9-4.5"],
  suite: ["M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M12 7.5v9", "M7.5 12h9"],
  shifts: ["M7 3v3", "M17 3v3", "M4 8h16", "M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M8 13l2.2 2.2L16 10.5"],
};

export default function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`draw ${className}`}
      aria-hidden="true"
    >
      {paths[name].map((d, i) => (
        <path key={i} d={d} pathLength={1} style={{ transitionDelay: `${i * 90}ms` }} />
      ))}
    </svg>
  );
}
