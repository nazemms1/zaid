"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useSite } from "./SiteContext";
import { scrollToId } from "./Header";

const VIDEO_BASE = "https://video.wixstatic.com/video/e272fc_175ddb461d9b4790b33dbb4efdd3d9bd";

/** Hero is the film only — no copy on top of the picture (the video carries the names). */
export default function Hero() {
  const { ready } = useSite();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState("");
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  // always serve a rendition that matches the screen — never upscale a small file
  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const w = window.innerWidth * (window.devicePixelRatio > 1.5 ? 1.5 : 1);
    const q = saveData ? "480p" : w >= 1000 ? "1080p" : w >= 640 ? "720p" : "480p";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrc(`${VIDEO_BASE}/${q}/mp4/file.mp4`);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [src]);

  // pause when off-screen
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section id="top" ref={ref} className="hero">
      <motion.div className="letterbox t" initial={{ y: 0 }} animate={ready ? { y: "-100%" } : {}} transition={{ duration: 1.2, delay: 1.1, ease: [0.76, 0, 0.24, 1] }} />
      <motion.div className="letterbox b" initial={{ y: 0 }} animate={ready ? { y: "100%" } : {}} transition={{ duration: 1.2, delay: 1.1, ease: [0.76, 0, 0.24, 1] }} />

      <motion.div className="hero-media" style={{ scale, opacity }}>
        {src && (
          <video
            ref={videoRef}
            className={`hero-video ${playing ? "on" : ""}`}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setPlaying(true)}
          />
        )}
        <div className="hero-vignette" />
      </motion.div>

      <motion.div
        className="hero-bar"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
      >
        <button className="scroll-cue" onClick={() => scrollToId("work")} aria-label="Scroll down">
          <span className="scroll-line" />
        </button>
        <button className="sound-btn icon-only" onClick={toggleSound} aria-label={muted ? "Sound on" : "Sound off"}>
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </motion.div>
    </section>
  );
}
