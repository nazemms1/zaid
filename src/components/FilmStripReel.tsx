"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA, PhotographItem } from "@/data/portfolioData";
import styles from "./FilmStripReel.module.css";
import { Film, Sparkles } from "lucide-react";

interface FilmStripReelProps {
  onSelectPhoto: (photo: PhotographItem) => void;
}

export default function FilmStripReel({ onSelectPhoto }: FilmStripReelProps) {
  const { lang, focusLevel } = useCamera();
  const trackRef = useRef<HTMLDivElement>(null);

  const blurAmount = Math.max(0, (100 - focusLevel) * 0.08);
  const photos = PORTFOLIO_DATA.photographs;

  return (
    <section className={styles.sectionWrapper} id="filmstrip">
      <div className={styles.headerText}>
        <div className={styles.badge}>
          <Film size={12} />
          <span>{lang === "ar" ? "أرشيف النيجاتيف والفيلم 35 مم" : "35mm Analog Negative Reel"}</span>
        </div>
        <h2 className={`${styles.title} cinema-title`}>
          {lang === "ar" ? "شريط الفيلم السينمائي التفاعلي" : "The Continuous 35mm Film Roll"}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
          {lang === "ar"
            ? "اسحب الشريط أفقياً لاستعراض لقطات النيجاتيف الخام كما يراها المخرج على طاولة الفحص"
            : "Drag horizontally to inspect uncut master negative frames on the lightbox"}
        </p>
      </div>

      <div className={styles.filmTrackWrapper} ref={trackRef}>
        <div className={styles.filmStrip}>
          {photos.map((item, index) => (
            <div
              key={item.id}
              className={styles.filmFrame}
              onClick={() => onSelectPhoto(item)}
            >
              {/* Top Sprocket Holes */}
              <div className={styles.sprocketsRow}>
                <div className={styles.sprocketHole} />
                <span className={styles.edgeCode}>KODAK 5219</span>
                <div className={styles.sprocketHole} />
                <span className={styles.edgeCode}>24A</span>
                <div className={styles.sprocketHole} />
              </div>

              {/* Photo Frame Container */}
              <div className={styles.imageBox}>
                <Image
                  src={item.imageUrl}
                  alt={lang === "ar" ? item.titleAr : item.titleEn}
                  fill
                  sizes="320px"
                  className={styles.frameImage}
                  style={{
                    filter: `blur(${blurAmount}px)`,
                  }}
                />
              </div>

              {/* Bottom Sprocket Holes & Metadata */}
              <div className={styles.sprocketsRow}>
                <div className={styles.sprocketHole} />
                <span className={styles.edgeCode}>FRAME #{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.sprocketHole} />
                <span className={styles.edgeCode}>SAFETY FILM</span>
                <div className={styles.sprocketHole} />
              </div>

              <div className={styles.frameFooter}>
                <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>
                  {lang === "ar" ? item.titleAr : item.titleEn}
                </span>
                <span style={{ color: "var(--accent-gold)" }}>{item.exif.focalLength}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
