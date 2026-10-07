"use client";

import { useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fade/slide up when scrolled into view */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Heading whose lines slide up out of a mask */
export function MaskLines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <h2 className={className}>
      {lines.map((l, i) => (
        <span className="mask" key={l + i} style={{ display: "block" }}>
          <motion.span
            style={{ display: "block" }}
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, delay: i * 0.12, ease }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="sw">
      {word}{" "}
    </motion.span>
  );
}

/** Paragraph whose words light up as you scroll */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

/** YouTube thumbnail, falls back from maxres to hq */
export function YtThumb({ id, alt, className }: { id: string; alt: string; className?: string }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onLoad={(e) => {
        // YouTube serves a 120px placeholder when maxres is missing
        if (e.currentTarget.naturalWidth <= 200) setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
      }}
      onError={() => setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
    />
  );
}

/** Element that is gently pulled toward the cursor */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [o, setO] = useState({ x: 0, y: 0 });
  return (
    <motion.span
      ref={ref}
      className="mag"
      animate={o}
      transition={{ type: "spring", stiffness: 220, damping: 15, mass: 0.3 }}
      onPointerMove={(e) => {
        const b = ref.current!.getBoundingClientRect();
        setO({ x: (e.clientX - (b.left + b.width / 2)) * strength, y: (e.clientY - (b.top + b.height / 2)) * strength });
      }}
      onPointerLeave={() => setO({ x: 0, y: 0 })}
    >
      {children}
    </motion.span>
  );
}
