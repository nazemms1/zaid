"use client";

import React, { useState } from "react";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import styles from "./HeroSection.module.css";
import ApertureIris from "./ApertureIris";
import { Play, Film, Award, Sparkles, Compass } from "lucide-react";

export default function HeroSection() {
  const { lang, aperture, setAperture } = useCamera();
  const [selectedVideoId, setSelectedVideoId] = useState<string>("O_NxsX52uNM");
  const [aspectRatio, setAspectRatio] = useState<"239" | "185" | "169">("239");

  const director = PORTFOLIO_DATA.director;
  const currentVideo = PORTFOLIO_DATA.videos.find((v) => v.youtubeId === selectedVideoId) || PORTFOLIO_DATA.videos[0];

  return (
    <section className={styles.heroWrapper} id="showreel">
      <div className={styles.ambientGlow} />

      <div className={styles.heroContent}>
        {/* Heritage & Status Badges */}
        <div className={styles.badgeRow}>
          <div className={styles.heritageBadge}>
            <Award size={13} />
            <span>
              {lang === "ar"
                ? "إرث سينمائي عالمي // نجل المخرج مصطفى العقاد"
                : "Cinematic Heritage // Son of Director Moustapha Akkad"}
            </span>
          </div>

          <div className={styles.liveTag}>
            <span className="rec-indicator" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#ff3344" }} />
            <span>{lang === "ar" ? "مباشر من موقع التصوير" : "ACTIVE ON SET"}</span>
          </div>
        </div>

        {/* Master Headline */}
        <div>
          <h1 className={`${styles.heroTitle} cinema-title`}>
            {lang === "ar" ? director.nameAr : director.nameEn}
          </h1>
          <p style={{ color: "var(--accent-gold)", fontFamily: "var(--font-mono)", fontSize: "0.95rem", marginTop: "6px", letterSpacing: "0.1em" }}>
            {lang === "ar" ? director.companyAr : director.companyEn}
          </p>
        </div>

        {/* Subtitle / Philosophy */}
        <p className={styles.heroSubtitle}>
          {lang === "ar" ? director.bioAr : director.bioEn}
        </p>

        <p className={styles.philosophyQuote}>
          {lang === "ar" ? director.quoteAr : director.quoteEn}
        </p>

        {/* Interactive Cinema Monitor & Showreel Player */}
        <div className={styles.cinemaMonitor}>
          {/* Director's Slate Header */}
          <div className={styles.slateHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className={styles.slateStripes} />
              <span>SCENE: {currentVideo.categoryEn.toUpperCase()}</span>
              <span>•</span>
              <span>TAKE: {currentVideo.year}</span>
              <span>•</span>
              <span style={{ color: "var(--accent-cyan)" }}>
                CAM: {currentVideo.camera}
              </span>
            </div>

            {/* Matte Aspect Ratio Switcher */}
            <div className={styles.aspectControl}>
              <button
                type="button"
                className={`${styles.aspectButton} ${aspectRatio === "239" ? styles.aspectButtonActive : ""}`}
                onClick={() => setAspectRatio("239")}
                title="Cinemascope 2.39:1 Anamorphic"
              >
                2.39:1 SCOPE
              </button>
              <button
                type="button"
                className={`${styles.aspectButton} ${aspectRatio === "185" ? styles.aspectButtonActive : ""}`}
                onClick={() => setAspectRatio("185")}
                title="Flat Cinema 1.85:1"
              >
                1.85:1 FLAT
              </button>
              <button
                type="button"
                className={`${styles.aspectButton} ${aspectRatio === "169" ? styles.aspectButtonActive : ""}`}
                onClick={() => setAspectRatio("169")}
                title="Broadcast 16:9 HD"
              >
                16:9 HD
              </button>
            </div>
          </div>

          {/* YouTube Video Embed Frame */}
          <div
            className={`${styles.videoContainer} ${
              aspectRatio === "239"
                ? styles.videoScope239
                : aspectRatio === "185"
                ? styles.videoScope185
                : ""
            }`}
          >
            <iframe
              className={styles.videoIframe}
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=0&rel=0&modestbranding=1&color=white`}
              title={lang === "ar" ? currentVideo.titleAr : currentVideo.titleEn}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Selector Strip (Quick-Switching Showreels & Commercials) */}
          <div className={styles.videoPillsRow}>
            {PORTFOLIO_DATA.videos.map((vid) => (
              <button
                key={vid.youtubeId}
                type="button"
                className={`${styles.videoPill} ${
                  selectedVideoId === vid.youtubeId ? styles.videoPillActive : ""
                }`}
                onClick={() => setSelectedVideoId(vid.youtubeId)}
              >
                <Play size={10} />
                <span>{lang === "ar" ? vid.titleAr : vid.titleEn}</span>
                <span style={{ opacity: 0.6 }}>({vid.year})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>15+</div>
            <div className={styles.statLabel}>
              {lang === "ar" ? "سنوات من الإخراج السينمائي" : "Years Directing Cinema"}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>5</div>
            <div className={styles.statLabel}>
              {lang === "ar" ? "عواصم إقليمية (إسطنبول، دبي، الرياض...)" : "Global Production Hubs"}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>100M+</div>
            <div className={styles.statLabel}>
              {lang === "ar" ? "مشاهدات البث التلفزيوني والرقمي" : "Broadcast & Digital Views"}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>ARRI 8K</div>
            <div className={styles.statLabel}>
              {lang === "ar" ? "عدسات أنامورفيك وفول فريم" : "Large Format Anamorphic"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
