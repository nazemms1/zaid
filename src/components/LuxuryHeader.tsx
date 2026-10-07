"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { InstagramIcon } from "@/components/Icons";
import styles from "./LuxuryHeader.module.css";

export default function LuxuryHeader() {
  const { lang, toggleLang, activeSlideIndex, totalSlides, scrollToSlide } = usePortfolio();
  const director = PORTFOLIO_DATA.director;

  const slideTitlesEn = [
    "MASTER SHOWREEL",
    "THE ROLEX SUBMARINER",
    "HUGO BOSS BOTTLED NIGHT",
    "STILL MASTERWORKS",
    "DAVINCI 35MM GRADE",
    "INSTAGRAM EXHIBITION",
    "CINEMA HERITAGE",
    "EXCLUSIVE INQUIRIES"
  ];

  const slideTitlesAr = [
    "الشوريـل السينمائي 2025",
    "إعلان رولكس سابمارينر",
    "إعلان هوغو بوس نايت",
    "معرض اللقطات الفاخرة",
    "معمل تدريج الألوان 35 مم",
    "معرض إنستغرام الحي",
    "الإرث السينمائي والعتاد",
    "حجز واستشارات الإنتاج"
  ];

  const currentTitle = lang === "ar"
    ? slideTitlesAr[activeSlideIndex] || slideTitlesAr[0]
    : slideTitlesEn[activeSlideIndex] || slideTitlesEn[0];

  return (
    <header className={styles.header}>
      {/* Brand Identity */}
      <div className={styles.brand} onClick={() => scrollToSlide(0)}>
        <span className={styles.brandTitle}>
          {lang === "ar" ? director.companyAr : "AKKAD PICTURES"}
        </span>
        <span className={styles.brandSubtitle}>
          {lang === "ar" ? "زيد العقاد // مخرج سينمائي" : "ZAID AKKAD // FILM DIRECTOR"}
        </span>
      </div>

      {/* Center Slide Indicator */}
      <div className={styles.centerProgress}>
        <div className={styles.progressDot} />
        <span>
          {String(activeSlideIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>
        <span style={{ color: "#fff", fontWeight: 600 }}>•</span>
        <span style={{ color: "var(--accent-gold-light)" }}>{currentTitle}</span>
      </div>

      {/* Right Controls */}
      <div className={styles.navRight}>
        <a
          href={director.contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.igLink}
        >
          <InstagramIcon size={14} color="#e1306c" />
          <span>@zaid.akkad</span>
        </a>

        <button type="button" className={styles.langBtn} onClick={toggleLang}>
          {lang === "ar" ? "ENGLISH" : "عـربـي"}
        </button>

        <button
          type="button"
          className={styles.contactBtn}
          onClick={() => scrollToSlide(totalSlides - 1)}
        >
          {lang === "ar" ? "تواصل معنا" : "INQUIRE"}
        </button>
      </div>
    </header>
  );
}
