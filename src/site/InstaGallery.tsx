"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionValue, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { GALLERY_SHOTS, GalleryShot, sized } from "@/data/instagramGallery";
import { SITE } from "@/data/siteData";
import { useSite } from "./SiteContext";
import { MaskLines } from "./ui";

const N = Math.min(GALLERY_SHOTS.length, 14);
// the fly-through shows an even sample of the whole set; the viewer steps through every image
const LOCAL_COUNT = GALLERY_SHOTS.filter((s) => s.src.startsWith("/")).length;
const REST = GALLERY_SHOTS.length - LOCAL_COUNT;
const PICKS = [
  ...Array.from({ length: LOCAL_COUNT }, (_, i) => i),
  ...Array.from({ length: Math.max(0, N - LOCAL_COUNT) }, (_, i) => LOCAL_COUNT + Math.floor((i * REST) / Math.max(1, N - LOCAL_COUNT))),
];
const STEP = 640; // z distance between frames
// deterministic scatter so SSR and client match
const SLOTS = [
  [-30, -14], [26, 12], [-8, 22], [34, -20], [-36, 14], [10, -26], [-22, -4], [28, 26], [-4, -18], [38, 4], [-30, 26], [16, 8],
];

function Frame({ shot, i, progress, onOpen, tilt }: {
  shot: GalleryShot;
  i: number;
  progress: MotionValue<number>;
  onOpen: () => void;
  tilt: { x: MotionValue<number>; y: MotionValue<number> };
}) {
  const { tr } = useSite();
  const total = N * STEP;
  // frame travels from far (negative z) toward / past the camera
  const z = useTransform(progress, [0, 1], [-i * STEP, total - i * STEP - STEP * 0.6]);
  const opacity = useTransform(z, [-3400, -2300, 200, 520], [0, 1, 1, 0]);
  const blur = useTransform(z, [-3400, -1200, 0], [8, 0, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const [sx, sy] = SLOTS[i % SLOTS.length];
  const px = useTransform(tilt.x, (v) => v * (i % 3 + 1) * -8);
  const py = useTransform(tilt.y, (v) => v * (i % 3 + 1) * -8);
  const pe = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));

  return (
    <motion.button
      className="tf"
      style={{ left: `${50 + sx}%`, top: `${50 + sy}%`, z, x: px, y: py, opacity, filter, pointerEvents: pe }}
      onClick={onOpen}
      data-cursor={tr("VIEW", "عرض")}
      aria-label={shot.title?.en ?? "Photo"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sized(shot.src, 1000)} alt={shot.title?.en ?? ""} draggable={false} loading="lazy" />
      <span className="tf-no">{String(i + 1).padStart(2, "0")}</span>
    </motion.button>
  );
}

function Viewer({ index, setIndex }: { index: number | null; setIndex: (i: number | null) => void }) {
  const { tr } = useSite();
  const step = useCallback(
    (d: number) => index !== null && setIndex((index + d + GALLERY_SHOTS.length) % GALLERY_SHOTS.length),
    [index, setIndex]
  );
  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [index, step, setIndex]);

  const shot = index !== null ? GALLERY_SHOTS[index] : null;
  return (
    <AnimatePresence>
      {shot && (
        <motion.div className="lightbox ig-viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIndex(null)}>
          <button className="lb-close" aria-label="Close" onClick={() => setIndex(null)}><X size={22} /></button>
          <AnimatePresence mode="wait">
            <motion.div
              key={shot.id}
              className="ig-stage"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) step(1);
                else if (info.offset.x > 80) step(-1);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sized(shot.src, 2200)} alt={shot.title?.en ?? ""} draggable={false} />
              <p>
                <small>
                  {String(index! + 1).padStart(2, "0")} / {String(GALLERY_SHOTS.length).padStart(2, "0")}
                  {shot.category ? " — " + tr(shot.category.en, shot.category.ar) : ""}
                </small>
                {shot.title && <b>{tr(shot.title.en, shot.title.ar)}</b>}
              </p>
            </motion.div>
          </AnimatePresence>
          <button className="lb-nav prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }}><ArrowLeft size={22} /></button>
          <button className="lb-nav next" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }}><ArrowRight size={22} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function InstaGallery() {
  const { tr } = useSite();
  const outer = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    const m = () => setFlat(window.innerWidth < 700 || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotY = useTransform(smx, (v) => v * 6);
  const rotX = useTransform(smy, (v) => v * -5);
  const counter = useTransform(p, (v) => String(Math.min(N, Math.floor(v * N) + 1)).padStart(2, "0"));
  const [cur, setCur] = useState("01");
  useEffect(() => counter.on("change", setCur), [counter]);
  const titleOpacity = useTransform(p, [0, 0.12], [1, 0]);

  const onMove = (e: React.PointerEvent) => {
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    my.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  const handle = SITE.contact.instagramHandle;

  return (
    <>
      {!flat ? (
        <section id="photography" ref={outer} className="tunnel" style={{ height: `${N * 60 + 100}vh` }}>
          <div className="tunnel-sticky" onPointerMove={onMove}>
            <div className="tunnel-hud top">
              <span>{tr("Photography", "التصوير")} — {handle}</span>
              <span>HD · {GALLERY_SHOTS.length} {tr("frames", "لقطة")}</span>
            </div>
            <motion.div className="tunnel-title" style={{ opacity: titleOpacity }}>
              <MaskLines lines={[tr("Through", "عبر"), tr("the lens.", "العدسة.")]} />
              <p>{tr("Scroll to fly through the frames", "مرّر للتحليق بين اللقطات")}</p>
            </motion.div>
            <motion.div className="tunnel-world" style={{ rotateX: rotX, rotateY: rotY }}>
              {PICKS.map((g, i) => (
                <Frame key={GALLERY_SHOTS[g].id} shot={GALLERY_SHOTS[g]} i={i} progress={p} onOpen={() => setOpen(g)} tilt={{ x: smx, y: smy }} />
              ))}
            </motion.div>
            <div className="tunnel-vignette" />
            <div className="tunnel-hud bottom">
              <span className="tunnel-count">{cur}<i>/{String(N).padStart(2, "0")}</i></span>
              <a href={SITE.contact.instagram} target="_blank" rel="noreferrer">
                {tr("Follow on Instagram", "تابعنا على إنستغرام")} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>
      ) : (
        <section id="photography" className="photo">
          <div className="section-head">
            <small className="eyebrow">{tr("Photography", "التصوير")} — {handle}</small>
            <MaskLines className="section-title" lines={[tr("Through", "عبر"), tr("the lens.", "العدسة.")]} />
          </div>
          <div className="flat-list">
            {GALLERY_SHOTS.map((s, i) => (
              <motion.button
                key={s.id}
                className="flat-item"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setOpen(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sized(s.src, 1000)} alt={s.title?.en ?? ""} loading="lazy" draggable={false} />
              </motion.button>
            ))}
          </div>
        </section>
      )}

      <Viewer index={open} setIndex={setOpen} />
    </>
  );
}
