"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SERVICES, SITE } from "@/data/siteData";
import { useSite } from "./SiteContext";
import { MaskLines, Reveal, ScrollWords } from "./ui";

export default function About() {
  const { tr } = useSite();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section id="about" ref={ref} className="about">
      <motion.div className="about-bg-text" style={{ x: bigX }} aria-hidden dir="ltr">
        AKKAD PICTURES · AKKAD FILMS · AKKAD PICTURES ·
      </motion.div>

      <div className="about-grid">
        <div>
          <small className="eyebrow">{tr("What we do", "ماذا نقدّم")}</small>
          <MaskLines className="section-title" lines={[tr("Stories,", "قصص،"), tr("crafted.", "بإتقان.")]} />
        </div>
        <div>
          <ScrollWords className="about-lead" text={tr(SITE.quote.en, SITE.quote.ar)} />
        </div>
      </div>

      <ul className="services">
        {SERVICES.map((s, i) => (
          <Reveal key={s.en} delay={i * 0.08} className="service">
            <li>
              <span className="service-no">0{i + 1}</span>
              <h3>{tr(s.en, s.ar)}</h3>
              <p>{tr(s.textEn, s.textAr)}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
