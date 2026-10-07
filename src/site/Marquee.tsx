"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

const ITEMS = ["ROLEX", "HUGO BOSS", "SPACETOON", "ARRI ALEXA 35", "COOKE ANAMORPHIC", "LONDON", "DUBAI", "ISTANBUL", "RIYADH", "DAVINCI RESOLVE"];

/** Infinite marquee whose speed (and direction) reacts to scroll velocity. */
export default function Marquee() {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [-6, 0, 6], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(base, (v) => `${-(((v % 50) + 50) % 50)}%`);

  useAnimationFrame((_, delta) => {
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    base.set(base.get() + dir.current * (0.35 + Math.abs(f)) * (delta / 1000) * 3);
  });

  const row = ITEMS.map((t, i) => (
    <span key={i} className="marquee-item">
      {t}
      <i />
    </span>
  ));

  return (
    <div className="marquee" aria-hidden>
      <motion.div className="marquee-track" style={{ x }}>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
