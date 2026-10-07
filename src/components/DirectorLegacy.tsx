"use client";

import React from "react";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import styles from "./DirectorLegacy.module.css";
import { Film, Award, MapPin, Cpu, CheckCircle } from "lucide-react";

export default function DirectorLegacy() {
  const { lang } = useCamera();
  const director = PORTFOLIO_DATA.director;

  return (
    <section className={styles.sectionWrapper} id="about">
      <div className={styles.legacyGrid}>
        {/* Left Column: Heritage & Philosophy */}
        <div className={styles.leftCol}>
          <div className={styles.heritageTag}>
            <Award size={13} />
            <span>{lang === "ar" ? "الإرث والفلسفة الإخراجية" : "Cinema Lineage & Philosophy"}</span>
          </div>

          <h2 className={`${styles.mainHeading} cinema-title`}>
            {lang === "ar"
              ? "استمرار مدرسة الإخراج الكبرى برؤية معاصرة"
              : "Bridging Epic Cinematic Heritage With Modern Precision"}
          </h2>

          <p className={styles.descriptionParagraph}>
            {lang === "ar" ? director.heritageAr : director.heritageEn}
          </p>

          <div className={styles.quoteBox}>
            {lang === "ar" ? director.quoteAr : director.quoteEn}
          </div>

          {/* Regional Hubs */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>
              {lang === "ar" ? "مراكز الإنتاج الدولي:" : "International Production Hubs:"}
            </div>
            <div className={styles.hubsRow}>
              {director.hubs.map((hub) => (
                <div key={hub.nameEn} className={styles.hubPill}>
                  <MapPin size={11} style={{ color: "var(--accent-gold)" }} />
                  <span>{lang === "ar" ? hub.nameAr : hub.nameEn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Gear Arsenal */}
        <div className={styles.rightCol}>
          <div className={styles.gearHeading}>
            <Cpu size={18} style={{ color: "var(--accent-gold)" }} />
            <span>{lang === "ar" ? "ترسانة المعدات والتقنيات" : "Cinematic Gear & Finishing Arsenal"}</span>
          </div>

          {director.gearList.map((group) => (
            <div key={group.category} className={styles.gearGroup}>
              <div className={styles.gearCategoryTitle}>{group.category}</div>
              <ul className={styles.gearList}>
                {group.items.map((item) => (
                  <li key={item} className={styles.gearItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{ marginTop: "20px", padding: "12px 16px", borderRadius: "8px", background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.2)", fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>
            ✓ {lang === "ar" ? "جاهزية إنتاجية كاملة بمستشعرات 8K وعدسات أنامورفيك" : "Full 8K Large Format & Anamorphic turn-key production ready"}
          </div>
        </div>
      </div>
    </section>
  );
}
