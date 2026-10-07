"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useSite } from "./SiteContext";

const links = [
  { id: "work", en: "Films", ar: "الأفلام" },
  { id: "photography", en: "Photography", ar: "التصوير" },
  { id: "reels", en: "Reels", ar: "ريلز" },
  { id: "about", en: "About", ar: "عن زيد" },
  { id: "contact", en: "Contact", ar: "تواصل" },
];

type LenisLike = { scrollTo: (t: Element | number, o?: object) => void };

export function scrollToId(id: string) {
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (id === "top") return lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" });
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Header() {
  const { tr, ready } = useSite();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
    setSolid(y > 60);
  });

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        className={`header ${solid ? "solid" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: ready && (!hidden || open) ? 0 : -100 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#top"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            go("top");
          }}
        >
          <span className="logo-mark">A</span>
          <span className="logo-text">ZAID AKKAD</span>
        </a>
        <nav className="nav">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(l.id);
              }}
            >
              {tr(l.en, l.ar)}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className={`burger ${open ? "on" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            style={{ transitionDelay: `${open ? 0.15 + i * 0.07 : 0}s` }}
            onClick={(e) => {
              e.preventDefault();
              go(l.id);
            }}
          >
            <small>0{i + 1}</small>
            {tr(l.en, l.ar)}
          </a>
        ))}
      </div>
    </>
  );
}
