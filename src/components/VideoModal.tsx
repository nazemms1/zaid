"use client";

import React, { useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import styles from "./VideoModal.module.css";
import { X } from "lucide-react";

export default function VideoModal() {
  const { lang, activeVideoId, closeVideoModal } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideoModal();
    };
    if (activeVideoId) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideoId, closeVideoModal]);

  if (!activeVideoId) return null;

  const project = PORTFOLIO_DATA.videos.find((v) => v.youtubeId === activeVideoId);

  return (
    <div className={styles.modalBackdrop} onClick={closeVideoModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <span style={{ color: "var(--accent-gold-light)", fontWeight: 700 }}>
              {project ? (lang === "ar" ? project.titleAr : project.titleEn) : "CINEMA PLAYER"}
            </span>
            {project && (
              <span style={{ color: "var(--text-muted)", marginLeft: "12px", marginRight: "12px" }}>
                // {project.camera}
              </span>
            )}
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeVideoModal}
            aria-label="Close Cinema Player"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.videoStage}>
          <iframe
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&color=white`}
            title="Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {project && (
          <div className={styles.modalFooter}>
            <div>
              {lang === "ar" ? project.descriptionAr : project.descriptionEn}
            </div>
            <div style={{ color: "var(--accent-gold)" }}>
              {project.categoryEn} • {project.year}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
