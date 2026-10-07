/**
 * Reels that play INSIDE the site (Instagram's embedded player — no redirect).
 * Taken from @zaid.akkad / @akkad.pictures, newest first.
 *
 * To add one: { id, instagram: "https://www.instagram.com/reel/XXXX/", title }.
 * To use your own file instead: { id, video: "/reels/clip.mp4", poster: "/reels/clip.jpg" }
 * (put files in public/reels/). The section hides itself if the list is empty.
 */
export interface ReelItem {
  id: string;
  title?: string;
  instagram?: string;
  video?: string;
  poster?: string;
}

const ig = (code: string) => `https://www.instagram.com/reel/${code}/`;

export const REELS: ReelItem[] = [
  { id: "DbVhvF6tcYV", title: "28 Jul 2026", instagram: ig("DbVhvF6tcYV") },
  { id: "DacqOhrNaPe", title: "06 Jul 2026", instagram: ig("DacqOhrNaPe") },
  { id: "DTfmD6bjc9C", title: "14 Jan 2026", instagram: ig("DTfmD6bjc9C") },
  { id: "DScpYdDjT7f", title: "19 Dec 2025", instagram: ig("DScpYdDjT7f") },
  { id: "DSNoF1WDRfN", title: "13 Dec 2025", instagram: ig("DSNoF1WDRfN") },
  { id: "DRKq5n7DDtj", title: "17 Nov 2025 · Akkad Pictures", instagram: ig("DRKq5n7DDtj") },
  { id: "DP9Z5jmjCuI", title: "18 Oct 2025 · Akkad Pictures", instagram: ig("DP9Z5jmjCuI") },
];
