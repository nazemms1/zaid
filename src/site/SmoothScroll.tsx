"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useSite } from "./SiteContext";

type LenisWindow = Window & { __lenis?: Lenis };

export default function SmoothScroll() {
  const { ready, videoId } = useSite();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    (window as LenisWindow).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as LenisWindow).__lenis;
    };
  }, []);

  // lock scroll during the preloader and while a modal is open
  useEffect(() => {
    const lenis = (window as LenisWindow).__lenis;
    const lock = !ready || !!videoId;
    document.documentElement.style.overflow = lock ? "hidden" : "";
    if (lock) lenis?.stop();
    else lenis?.start();
  }, [ready, videoId]);

  return null;
}
