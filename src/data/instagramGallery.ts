import { SHOTS, sized, Shot } from "./siteData";

export { sized };

export type GalleryShot = Omit<Shot, "title" | "category"> & {
  title?: Shot["title"];
  category?: Shot["category"];
};

/**
 * ORIGINAL full-quality files (e.g. from Instagram @zaid.akkad):
 *   1. Put the images in  public/instagram/  (01.jpg, 02.jpg …)
 *   2. Add them here as  { id: "ig-01", src: "/instagram/01.jpg" }
 * They are shown first in the gallery.
 */
const IG = { en: "Instagram", ar: "إنستغرام" };
const igShot = (id: string, file: string, n: number): GalleryShot => ({
  id,
  src: "/instagram/" + file,
  title: { en: "Instagram — " + String(n).padStart(2, "0"), ar: "إنستغرام — " + String(n).padStart(2, "0") },
  category: IG,
});

// latest photos from @zaid.akkad, saved at original resolution (1440×1800)
const LOCAL_SHOTS: GalleryShot[] = [
  igShot("ig-1", "p1.jpg", 1),
  igShot("ig-2", "p2-a.jpg", 2),
  igShot("ig-3", "p2-b.jpg", 3),
  igShot("ig-4", "p2-c.jpg", 4),
  igShot("ig-5", "p3.jpg", 5),
];

export const GALLERY_SHOTS: GalleryShot[] = [...LOCAL_SHOTS, ...SHOTS];
