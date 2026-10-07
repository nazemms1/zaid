"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { PORTFOLIO_DATA, PhotographItem } from "@/data/portfolioData";
import { useSite } from "./SiteContext";
import { MaskLines, Reveal } from "./ui";

const RATIO: Record<PhotographItem["aspectRatio"], string> = {
  square: "1 / 1",
  portrait: "4 / 5",
  landscape: "3 / 2",
  wide: "21 / 9",
};

const FILTERS: { id: "all" | PhotographItem["category"]; en: string; ar: string }[] = [
  { id: "all", en: "All", ar: "الكل" },
  { id: "commercial", en: "Commercial", ar: "تجاري" },
  { id: "editorial", en: "Editorial", ar: "أزياء" },
  { id: "product", en: "Product", ar: "منتجات" },
  { id: "bts", en: "Behind the scenes", ar: "كواليس" },
];

function Tile({ p, index, onOpen }: { p: PhotographItem; index: number; onOpen: (p: PhotographItem) => void }) {
  const { tr } = useSite();
  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 60, clipPath: "inset(12% 0 0 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.6 } }}
      className="tile"
      onClick={() => onOpen(p)}
      data-cursor={tr("VIEW", "عرض")}
    >
      <motion.div layoutId={`photo-${p.id}`} className="tile-img" style={{ aspectRatio: RATIO[p.aspectRatio] }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.imageUrl} alt={p.titleEn} loading="lazy" draggable={false} />
      </motion.div>
      <figcaption>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <b>{tr(p.titleEn, p.titleAr)}</b>
        <em>{tr(p.categoryLabelEn, p.categoryLabelAr)}</em>
      </figcaption>
    </motion.figure>
  );
}

function Lightbox({
  list,
  active,
  setActive,
}: {
  list: PhotographItem[];
  active: PhotographItem | null;
  setActive: (p: PhotographItem | null) => void;
}) {
  const { tr } = useSite();
  const idx = active ? list.findIndex((p) => p.id === active.id) : -1;

  const step = useCallback(
    (d: number) => {
      if (idx < 0) return;
      setActive(list[(idx + d + list.length) % list.length]);
    },
    [idx, list, setActive]
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active, step, setActive]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal
        >
          <button className="lb-close" aria-label="Close" onClick={() => setActive(null)}>
            <X size={22} />
          </button>
          <div className="lb-body" onClick={(e) => e.stopPropagation()}>
            <motion.div
              className="lb-img"
              layoutId={`photo-${active.id}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) step(1);
                else if (info.offset.x > 80) step(-1);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.imageUrl} alt={active.titleEn} draggable={false} />
            </motion.div>
            <motion.div
              key={active.id}
              className="lb-info"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              <small>
                {String(idx + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")} —{" "}
                {tr(active.categoryLabelEn, active.categoryLabelAr)}
              </small>
              <h3>{tr(active.titleEn, active.titleAr)}</h3>
              <p>{tr(active.descriptionEn, active.descriptionAr)}</p>
              <dl>
                <div><dt>Camera</dt><dd>{active.exif.camera}</dd></div>
                <div><dt>Lens</dt><dd>{active.exif.lens}</dd></div>
                <div><dt>Aperture</dt><dd>{active.exif.aperture}</dd></div>
                <div><dt>Shutter</dt><dd>{active.exif.shutter}</dd></div>
                <div><dt>ISO</dt><dd>{active.exif.iso}</dd></div>
              </dl>
              <div className="palette">
                {active.palette.map((c) => (
                  <i key={c} style={{ background: c }} title={c} />
                ))}
              </div>
            </motion.div>
          </div>
          <button className="lb-nav prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }}>
            <ArrowLeft size={22} />
          </button>
          <button className="lb-nav next" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }}>
            <ArrowRight size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Photography() {
  const { tr } = useSite();
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [active, setActive] = useState<PhotographItem | null>(null);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const m = () => setCols(window.innerWidth < 640 ? 1 : window.innerWidth < 1000 ? 2 : 3);
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [0, cols > 1 ? -60 : 0]);
  const y1 = useTransform(scrollYProgress, [0, 1], [cols > 1 ? 120 : 0, cols > 1 ? -160 : 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, cols > 2 ? -110 : 0]);
  const ys = [y0, y1, y2];

  const list = PORTFOLIO_DATA.photographs.filter((p) => filter === "all" || p.category === filter);
  const columns: PhotographItem[][] = Array.from({ length: cols }, () => []);
  list.forEach((p, i) => columns[i % cols].push(p));

  return (
    <section id="photography" ref={ref} className="photo">
      <div className="section-head">
        <small className="eyebrow">{tr("Stills", "صور ثابتة")} — {String(list.length).padStart(2, "0")}</small>
        <MaskLines className="section-title" lines={[tr("Light, frozen", "الضوء حين"), tr("in time.", "يتجمّد.")]} />
        <Reveal delay={0.2}>
          <div className="filters">
            {FILTERS.map((f) => (
              <button key={f.id} className={filter === f.id ? "on" : ""} onClick={() => setFilter(f.id)}>
                {tr(f.en, f.ar)}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="photo-cols" dir="ltr" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {columns.map((col, ci) => (
          <motion.div key={ci} className="photo-col" style={{ y: ys[ci] }} dir={tr("ltr", "rtl")}>
            <AnimatePresence mode="popLayout">
              {col.map((p) => (
                <Tile key={p.id} p={p} index={list.indexOf(p)} onOpen={setActive} />
              ))}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <Lightbox list={list} active={active} setActive={setActive} />
    </section>
  );
}
