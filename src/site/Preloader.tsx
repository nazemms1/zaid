"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSite } from "./SiteContext";

const MIN_MS = 2600;

const NONAGON = Array.from({ length: 9 }, (_, i) => {
  const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
  return [200 + Math.cos(a) * 56, 200 + Math.sin(a) * 56];
});
const POLY = NONAGON.map((p) => p.join(",")).join(" ");
const TEXT = "CINE PRIME 35mm  T1.5  •  AKKAD OPTICS  •  Ø95  •  0.35M / 1.15FT  •  MADE FOR MOTION  •  ";

/** Front element of a cine prime, seen head-on. The aperture is cut out so the site shows through it. */
function LensSvg({ locked }: { locked: boolean }) {
  return (
    <svg className="pre-svg" viewBox="0 0 400 400" aria-hidden>
      <defs>
        <mask id="lensHole">
          <rect width="400" height="400" fill="#fff" />
          <polygon points={POLY} fill="#000" />
        </mask>
        <radialGradient id="glass" cx="42%" cy="38%" r="70%">
          <stop offset="0" stopColor="#10131c" />
          <stop offset="0.6" stopColor="#06070b" />
          <stop offset="1" stopColor="#020203" />
        </radialGradient>
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a9a9a" />
          <stop offset="0.5" stopColor="#202020" />
          <stop offset="1" stopColor="#6a6a6a" />
        </linearGradient>
        <linearGradient id="coatA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a4dff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7a4dff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="coatB" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffb347" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </linearGradient>
        <path id="engrave" d="M200,200 m-150,0 a150,150 0 1,1 300,0 a150,150 0 1,1 -300,0" />
      </defs>
      <g mask="url(#lensHole)">
        <circle cx="200" cy="200" r="199" fill="#050505" />
        {/* focus ring: knurled, slowly pulling focus */}
        <g className={`pre-turn ${locked ? "stop" : ""}`}>
          <circle cx="200" cy="200" r="178" fill="none" stroke="#111" strokeWidth="34" />
          <circle cx="200" cy="200" r="178" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="34" strokeDasharray="1.4 4.6" />
          <circle cx="200" cy="200" r="195" fill="none" stroke="url(#chrome)" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="161" fill="none" stroke="#000" strokeWidth="2" />
        </g>
        {/* engraved scale */}
        <circle cx="200" cy="200" r="150" fill="#0b0b0c" stroke="#000" strokeWidth="1" />
        <text fontFamily="var(--mono)" fontSize="9.5" letterSpacing="2.6" fill="#c9c2b2" fillOpacity="0.75">
          <textPath href="#engrave">{TEXT}</textPath>
        </text>
        <circle cx="200" cy="200" r="139" fill="none" stroke="#d9b774" strokeOpacity="0.55" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="132" fill="none" stroke="url(#chrome)" strokeWidth="5" />
        <circle cx="200" cy="200" r="126" fill="none" stroke="#000" strokeWidth="2" />
        {/* glass */}
        <circle cx="200" cy="200" r="124" fill="url(#glass)" />
        <circle cx="200" cy="200" r="108" fill="none" stroke="#6a45ff" strokeOpacity="0.35" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="92" fill="none" stroke="#2f9bff" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="200" cy="200" r="78" fill="none" stroke="#ffae3d" strokeOpacity="0.28" strokeWidth="1" />
        <circle cx="200" cy="200" r="66" fill="none" stroke="#00e0b0" strokeOpacity="0.18" strokeWidth="1" />
        {/* coating reflections */}
        <path d="M118 150 A100 100 0 0 1 178 108 A88 88 0 0 0 126 168 Z" fill="url(#coatA)" />
        <path d="M282 252 A100 100 0 0 1 222 292 A88 88 0 0 0 274 232 Z" fill="url(#coatB)" />
        <ellipse cx="148" cy="136" rx="14" ry="5" transform="rotate(-38 148 136)" fill="#fff" fillOpacity="0.55" />
        <circle cx="258" cy="268" r="3.2" fill="#ff5a3c" fillOpacity="0.8" />
        <circle cx="232" cy="296" r="2.2" fill="#3cffb0" fillOpacity="0.55" />
        {/* iris blades */}
        <g stroke="#fff" strokeOpacity="0.12" strokeWidth="1">
          {NONAGON.map((p, i) => {
            const n = NONAGON[(i + 3) % 9];
            const dx = n[0] - p[0], dy = n[1] - p[1], len = Math.hypot(dx, dy);
            return <line key={i} x1={p[0]} y1={p[1]} x2={p[0] + (dx / len) * 52} y2={p[1] + (dy / len) * 52} />;
          })}
        </g>
        <polygon points={POLY} fill="none" stroke="#000" strokeWidth="3" />
      </g>
    </svg>
  );
}

/** Intro: a camera viewfinder pulls focus, locks, then the lens zooms open into the site. */
export default function Preloader() {
  const { ready, setReady } = useSite();
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    let alive = true;
    let to: ReturnType<typeof setTimeout>;
    // wait for the minimum take length AND every font, so the site never starts with a late swap
    const minTime = new Promise((r) => setTimeout(r, MIN_MS));
    const fonts = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 4500))]);
    Promise.all([minTime, fonts]).then(() => {
      if (!alive) return;
      setLocked(true);
      to = setTimeout(() => alive && setReady(true), 750);
    });
    return () => {
      alive = false;
      clearTimeout(to);
    };
  }, [setReady]);

  const zoom = { duration: 1.6, ease: [0.76, 0, 0.18, 1] as [number, number, number, number] };

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div className="preloader" exit={{ pointerEvents: "none" }}>
          <motion.div
            className="pre-lens"
            initial={{ scale: 0.55 }}
            animate={{ scale: 0.78 }}
            transition={{ duration: 3.6, ease: "easeOut" }}
            exit={{ scale: 16, transition: zoom }}
          >
            <div className="pre-hole" />
            <motion.div className="pre-art" exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.7 } }}>
              <div className="pre-metal" />
              <LensSvg locked={locked} />
              <i className={`pre-flare ${locked ? "on" : ""}`} />
            </motion.div>
          </motion.div>

          <motion.div className={`pre-ui ${locked ? "locked" : ""}`} exit={{ opacity: 0, transition: { duration: 0.45 } }}>
            <i className="pre-corner tl" /><i className="pre-corner tr" />
            <i className="pre-corner bl" /><i className="pre-corner br" />
            <div className="pre-top">
              <span className="pre-rec"><b /> REC</span>
              <span>AKKAD PICTURES</span>
              <span>24 FPS · 4K</span>
            </div>
            <div className="pre-focus"><i /><i /></div>
            <div className="pre-bottom">
              <span>ISO 800</span>
              <span>f/1.8</span>
              <span className="pre-state">{locked ? "FOCUS LOCKED" : "FOCUSING…"}</span>
              <span>1/48</span>
              <span>5600K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
