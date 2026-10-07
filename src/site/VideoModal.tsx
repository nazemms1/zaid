"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { FILMS } from "@/data/siteData";
import { useSite } from "./SiteContext";

export default function VideoModal() {
  const { videoId, closeVideo, tr } = useSite();
  const v = FILMS.find((x) => x.youtubeId === videoId);

  useEffect(() => {
    if (!videoId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeVideo();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoId, closeVideo]);

  return (
    <AnimatePresence>
      {videoId && (
        <motion.div
          className="vmodal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={closeVideo}
          role="dialog"
          aria-modal
        >
          <button className="lb-close" aria-label="Close" onClick={closeVideo}>
            <X size={22} />
          </button>
          <motion.div
            className="vmodal-frame"
            initial={{ scale: 0.88, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={v?.title ?? "Video"}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </motion.div>
          {v && (
            <p className="vmodal-cap">
              <b>{tr(v.title, v.titleAr ?? v.title)}</b> — {tr(v.kind.en, v.kind.ar)}{v.year ? `, ${v.year}` : ""}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
