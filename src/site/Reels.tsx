"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { REELS, ReelItem } from "@/data/reels";
import { useSite } from "./SiteContext";
import { MaskLines } from "./ui";

function igEmbed(url: string) {
  const m = url.match(/instagram\.com\/(?:[^/]+\/)?(reel|reels|p)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/${m[1] === "p" ? "p" : "reel"}/${m[2]}/embed` : url;
}

function ReelCard({ r, i, onOpen }: { r: ReelItem; i: number; onOpen: (r: ReelItem) => void }) {
  const { tr } = useSite();
  const vid = useRef<HTMLVideoElement>(null);
  return (
    <motion.button
      className="reel"
      onClick={() => onOpen(r)}
      onPointerEnter={() => vid.current?.play().catch(() => {})}
      onPointerLeave={() => vid.current?.pause()}
      data-cursor={tr("PLAY", "تشغيل")}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div className="reel-media hover">
        {r.video ? (
          <video ref={vid} src={r.video} poster={r.poster} muted loop playsInline preload="metadata" />
        ) : r.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.poster} alt="" draggable={false} />
        ) : (
          <div className="reel-blank"><span>{r.title}</span></div>
        )}
      </div>
      <div className="reel-shade" />
      <div className="reel-top">
        <span>REEL {String(i + 1).padStart(2, "0")}</span>
      </div>
      <span className="reel-play"><Play size={22} fill="currentColor" /></span>
      
    </motion.button>
  );
}

function ReelPlayer({ reel, onClose }: { reel: ReelItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!reel) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [reel, onClose]);

  return (
    <AnimatePresence>
      {reel && (
        <motion.div className="vmodal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button className="lb-close" aria-label="Close" onClick={onClose}><X size={22} /></button>
          <motion.div
            className="reel-player"
            initial={{ scale: 0.88, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {reel.video ? (
              <video src={reel.video} poster={reel.poster} controls autoPlay loop playsInline />
            ) : (
              <iframe src={igEmbed(reel.instagram ?? "")} allow="autoplay; encrypted-media; fullscreen" allowFullScreen title="Reel" />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Reels() {
  const { tr } = useSite();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  const [open, setOpen] = useState<ReelItem | null>(null);

  useEffect(() => {
    const m = () => {
      if (wrap.current && track.current) setLimit(Math.max(0, track.current.scrollWidth - wrap.current.clientWidth));
    };
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  if (REELS.length === 0) return null;

  return (
    <section id="reels" className="reels">
      <div className="section-head">
        <small className="eyebrow">{tr("Reels", "ريلز")}</small>
        <MaskLines className="section-title" lines={[tr("Moments in", "لحظات"), tr("motion.", "في حركة.")]} />
      </div>
      <div className="reels-wrap" ref={wrap} dir="ltr">
        <motion.div
          ref={track}
          className="reels-track"
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.12}
        >
          {REELS.map((r, i) => (
            <ReelCard key={r.id} r={r} i={i} onOpen={setOpen} />
          ))}
        </motion.div>
      </div>
      <ReelPlayer reel={open} onClose={() => setOpen(null)} />
    </section>
  );
}
