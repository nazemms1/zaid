"use client";

import React, { useState } from "react";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA, ProjectVideo } from "@/data/portfolioData";
import { cameraAudio } from "@/utils/cameraAudio";
import styles from "./CinemaReelShowcase.module.css";
import { Play, Clapperboard, Video, CheckCircle2 } from "lucide-react";

export default function CinemaReelShowcase() {
  const { lang } = useCamera();
  const commercialVideos = PORTFOLIO_DATA.videos.filter(
    (v) => v.id !== "showreel-2025" && v.id !== "showreel-2019"
  );
  const [activeVideo, setActiveVideo] = useState<ProjectVideo>(commercialVideos[0]);

  const handleSelect = (video: ProjectVideo) => {
    cameraAudio.playDial();
    setActiveVideo(video);
  };

  return (
    <section className={styles.sectionWrapper} id="commercials">
      <div className={styles.headerArea}>
        <div className={styles.tagline}>
          <Video size={12} style={{ display: "inline-block", marginRight: 6 }} />
          {lang === "ar" ? "أفلام الإعلانات التجارية العالمية" : "Commercial TVCs & Narrative Directing"}
        </div>
        <h2 className={`${styles.title} cinema-title`}>
          {lang === "ar" ? "إعلانات العلامات التجارية الفاخرة" : "High-Impact Commercial Campaigns"}
        </h2>
        <p className={styles.subtitle}>
          {lang === "ar"
            ? "من رولكس إلى هوغو بوس، تحويل رؤية العلامات التجارية إلى أعمال سينمائية بصرية تخاطب الحواس."
            : "From Rolex horology to Hugo Boss fragrance narratives, sculpting moments that rise above the noise."}
        </p>
      </div>

      <div className={styles.showcaseGrid}>
        {/* Big Cinema Monitor Screen */}
        <div className={styles.screenFrame}>
          <iframe
            className={styles.videoIframe}
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0&modestbranding=1&color=white`}
            title={lang === "ar" ? activeVideo.titleAr : activeVideo.titleEn}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video List Items */}
        <div className={styles.detailsCol}>
          {commercialVideos.map((video) => {
            const isActive = activeVideo.id === video.id;

            return (
              <div
                key={video.id}
                className={`${styles.projectCard} ${isActive ? styles.projectCardActive : ""}`}
                onClick={() => handleSelect(video)}
              >
                <div className={styles.cardLeft}>
                  <div className={styles.cardCategory}>
                    {lang === "ar" ? video.categoryAr : video.categoryEn} • {video.year}
                  </div>
                  <div className={styles.cardTitle}>
                    {lang === "ar" ? video.titleAr : video.titleEn}
                  </div>
                  <div className={styles.cardRole}>
                    {lang === "ar" ? video.roleAr : video.roleEn} // {video.camera}
                  </div>
                </div>

                <div className={styles.playBadge}>
                  <Play size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
