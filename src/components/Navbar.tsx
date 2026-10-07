"use client";

import React from "react";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { cameraAudio } from "@/utils/cameraAudio";
import styles from "./Navbar.module.css";
import { Aperture, Clapperboard, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

export default function Navbar() {
  const { lang } = useCamera();
  const director = PORTFOLIO_DATA.director;

  const handleLinkClick = () => {
    cameraAudio.playDial();
  };

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navContainer}>
        {/* Brand */}
        <a href="#showreel" className={styles.brandLogo} onClick={handleLinkClick}>
          <div className={styles.lensIcon}>
            <Aperture size={16} />
          </div>
          <div>
            <span className={styles.brandTitle}>
              {lang === "ar" ? director.companyAr : "AKKAD PICTURES"}
            </span>
          </div>
        </a>

        {/* Links */}
        <ul className={styles.navLinks}>
          <li className={styles.navLinkItem}>
            <a href="#showreel" onClick={handleLinkClick}>
              {lang === "ar" ? "الشوريـل" : "SHOWREEL"}
            </a>
          </li>
          <li className={styles.navLinkItem}>
            <a href="#gallery" onClick={handleLinkClick}>
              {lang === "ar" ? "المعرض الفاخر" : "STILLS"}
            </a>
          </li>
          <li className={styles.navLinkItem}>
            <a href="#color-grading" onClick={handleLinkClick}>
              {lang === "ar" ? "تدريج الألوان" : "DAVINCI GRADE"}
            </a>
          </li>
          <li className={styles.navLinkItem}>
            <a href="#filmstrip" onClick={handleLinkClick}>
              {lang === "ar" ? "شريط 35مم" : "35MM REEL"}
            </a>
          </li>
          <li className={styles.navLinkItem}>
            <a href="#commercials" onClick={handleLinkClick}>
              {lang === "ar" ? "الإعلانات" : "COMMERCIALS"}
            </a>
          </li>
          <li className={styles.navLinkItem}>
            <a href="#about" onClick={handleLinkClick}>
              {lang === "ar" ? "عن المخرج" : "HERITAGE"}
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className={styles.navActions}>
          <a
            href={director.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              padding: "6px",
              transition: "color 0.2s",
            }}
            title="Instagram @zaid.akkad"
          >
            <InstagramIcon size={17} />
          </a>

          <a href="#contact" className={styles.bookButton} onClick={handleLinkClick}>
            <Clapperboard size={12} />
            <span>{lang === "ar" ? "حجز إنتاج" : "BOOK PRODUCTION"}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
