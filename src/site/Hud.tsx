"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "./SiteContext";

const SCENES = [
  { id: "top", label: "OPENING" },
  { id: "work", label: "FILMS" },
  { id: "reels", label: "REELS" },
  { id: "photography", label: "STILLS" },
  { id: "about", label: "DIRECTOR" },
  { id: "contact", label: "WRAP" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Camera-monitor overlay: REC dot, running 24fps timecode and the current scene. */
export default function Hud() {
  const { ready } = useSite();
  const tcRef = useRef<HTMLSpanElement>(null);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (!ready) return;
    // written straight to the DOM — no React re-render 24x a second
    const t0 = performance.now();
    const id = setInterval(() => {
      const f = Math.floor((performance.now() - t0) / (1000 / 24));
      if (tcRef.current) tcRef.current.textContent = `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
    }, 1000 / 12);
    return () => clearInterval(id);
  }, [ready]);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let cur = 0;
      SCENES.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) cur = i;
      });
      setScene(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`hud ${ready ? "on" : ""} ${scene === SCENES.length - 1 ? "dark" : ""}`} aria-hidden>
      <span className="hud-rec"><i /> REC</span>
      <span className="hud-tc" ref={tcRef}>00:00:00:00</span>
      <span className="hud-scene">SC {pad(scene + 1)} · {SCENES[scene].label}</span>
    </div>
  );
}
