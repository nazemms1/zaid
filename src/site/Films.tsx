"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "motion/react";
import { Play } from "lucide-react";
import { FILMS, Film } from "@/data/siteData";
import { useSite } from "./SiteContext";
import { MaskLines, YtThumb } from "./ui";

function FilmCard({ v, i, progress }: { v: Film; i: number; progress: MotionValue<number> }) {
  const { tr, openVideo } = useSite();
  const [preview, setPreview] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // inner image drifts opposite to the track for a parallax feel
  const imgX = useTransform(progress, [0, 1], ["-7%", "7%"]);

  const enter = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    timer.current = setTimeout(() => setPreview(true), 450);
  };
  const leave = () => {
    clearTimeout(timer.current);
    setPreview(false);
  };

  return (
    <article className="film" onMouseEnter={enter} onMouseLeave={leave}>
      <div className="film-num" aria-hidden>
        {String(i + 1).padStart(2, "0")}
      </div>
      <button
        className="film-frame"
        onClick={() => openVideo(v.youtubeId)}
        data-cursor={tr("PLAY", "تشغيل")}
        aria-label={v.title}
      >
        <motion.div className="film-img" style={{ x: imgX }}>
          <YtThumb id={v.youtubeId} alt={v.title} />
        </motion.div>
        {preview && (
          <iframe
            className="film-preview"
            src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${v.youtubeId}&modestbranding=1&playsinline=1&disablekb=1`}
            allow="autoplay; encrypted-media"
            title="preview"
            tabIndex={-1}
          />
        )}
        <span className="film-play">
          <Play size={22} fill="currentColor" />
        </span>
        <span className="film-ratio">{tr(v.kind.en, v.kind.ar)}</span>
      </button>
      <div className="film-meta">
        <div>
          <small>
            {tr(v.kind.en, v.kind.ar)}{v.year ? ` — ${v.year}` : ""}
          </small>
          <h3>{tr(v.title, v.titleAr ?? v.title)}</h3>
        </div>
      </div>
    </article>
  );
}

export default function Films() {
  const { tr } = useSite();
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const measure = () => {
      setMobile(window.innerWidth < 800);
      setVh(window.innerHeight);
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(p, [0, 1], [0, -dist]);
  const bar = useTransform(p, [0, 1], [0, 1]);

  const videos = FILMS;

  return (
    <section
      id="work"
      ref={outer}
      className={`films ${mobile ? "films-mobile" : ""}`}
      style={mobile ? undefined : { height: dist + vh }}
    >
      <div className="films-sticky">
        <div className="films-head">
          <small className="eyebrow">{tr("Selected work", "أعمال مختارة")} — 2019/2025</small>
          <MaskLines className="films-title" lines={[tr("Films &", "أفلام"), tr("Commercials", "وإعلانات")]} />
        </div>
        <motion.div ref={track} className="films-track" style={mobile ? undefined : { x }} dir="ltr">
          <div className="films-intro" dir={tr("ltr", "rtl")}>
            <p>
              {tr(
                "TV commercials, short films and brand stories — watch them in full.",
                "إعلانات تلفزيونية وأفلام قصيرة وقصص للعلامات — شاهدها كاملة."
              )}
            </p>
            <span className="hint">{tr("Keep scrolling →", "تابع التمرير →")}</span>
          </div>
          {videos.map((v, i) => (
            <div key={v.id} dir={tr("ltr", "rtl")} style={{ display: "contents" }}>
              <FilmCard v={v} i={i} progress={p} />
            </div>
          ))}
          <div className="films-end" />
        </motion.div>
        {!mobile && (
          <div className="films-progress">
            <motion.span style={{ scaleX: bar }} />
          </div>
        )}
      </div>
    </section>
  );
}
