"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA, PhotographItem } from "@/data/portfolioData";
import { cameraAudio } from "@/utils/cameraAudio";
import styles from "./LoupeGallery.module.css";
import { Search, Sparkles, X, ChevronLeft, ChevronRight, Sliders, Maximize2 } from "lucide-react";

interface LoupeGalleryProps {
  selectedPhoto: PhotographItem | null;
  setSelectedPhoto: (photo: PhotographItem | null) => void;
}

export default function LoupeGallery({ selectedPhoto, setSelectedPhoto }: LoupeGalleryProps) {
  const { lang, focusLevel, aperture, focusPeaking } = useCamera();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loupeActive, setLoupeActive] = useState<boolean>(true);
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; pctX: number; pctY: number }>({
    x: 0,
    y: 0,
    pctX: 50,
    pctY: 50,
  });

  const photos = PORTFOLIO_DATA.photographs;
  const filteredPhotos = activeCategory === "all"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const blurAmount = Math.max(0, (100 - focusLevel) * 0.1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, photoId: string) => {
    if (!loupeActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    setCursorPos({ x, y, pctX, pctY });
    setHoveredPhotoId(photoId);
  };

  const handleCardClick = (photo: PhotographItem) => {
    cameraAudio.playLoupe();
    setSelectedPhoto(photo);
  };

  return (
    <section className={styles.gallerySection} id="gallery">
      <div className={styles.galleryHeader}>
        <div className={styles.tagline}>
          <Sparkles size={12} style={{ display: "inline-block", marginRight: 6 }} />
          {lang === "ar" ? "معرض اللقطات الفاخرة وعالية الدقة" : "Master Fine Art & Commercial Portfolio"}
        </div>
        <h2 className={`${styles.title} cinema-title`}>
          {lang === "ar" ? "أعمال التصوير الفوتوغرافي الحصرية" : "Selected Still Masterworks"}
        </h2>
        <p className={styles.subtitle}>
          {lang === "ar"
            ? "استكشف التفاصيل المجهرية بدقة 8K عبر عدسة الفحص (Loupe) المباشرة، وتأمل عزل العدسات وعمق الألوان الاستثنائي."
            : "Hover with the 2.5x Optical Loupe to inspect raw textures, micro-mechanical dial chamfers, and anamorphic depth."}
        </p>
      </div>

      {/* Filter Tabs and Loupe Inspection Toggle */}
      <div className={styles.controlsRow}>
        <div className={styles.filterTabs}>
          {[
            { id: "all", labelEn: "All Works", labelAr: "كافة الأعمال" },
            { id: "commercial", labelEn: "Commercial TVC & Campaigns", labelAr: "حملات تجارية وسينمائية" },
            { id: "product", labelEn: "Luxury Watches & Products", labelAr: "منتجات وساعات فاخرة" },
            { id: "editorial", labelEn: "Editorial & Portraits", labelAr: "أزياء وبورتريه" },
            { id: "bts", labelEn: "Behind The Scenes", labelAr: "كواليس الإنتاج" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.filterBtn} ${activeCategory === tab.id ? styles.filterBtnActive : ""}`}
              onClick={() => {
                cameraAudio.playDial();
                setActiveCategory(tab.id);
              }}
            >
              {lang === "ar" ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.loupeToggle} ${loupeActive ? styles.loupeToggleActive : ""}`}
          onClick={() => {
            cameraAudio.playDial();
            setLoupeActive(!loupeActive);
          }}
          title="Toggle 2.5x Loupe Magnifier Tool"
        >
          <Search size={13} />
          <span>{lang === "ar" ? "عدسة الفحص 2.5x (Loupe)" : "2.5x Optical Loupe Tool"}</span>
        </button>
      </div>

      {/* Photo Cards Grid */}
      <div className={styles.grid}>
        {filteredPhotos.map((photo) => {
          const isHovered = hoveredPhotoId === photo.id;

          return (
            <div
              key={photo.id}
              className={`${styles.card} ${
                photo.aspectRatio === "landscape"
                  ? styles.cardLandscape
                  : photo.aspectRatio === "portrait"
                  ? styles.cardPortrait
                  : ""
              }`}
            >
              {/* Image Frame with Loupe Interaction */}
              <div
                className={styles.imageWrapper}
                onMouseMove={(e) => handleMouseMove(e, photo.id)}
                onMouseLeave={() => setHoveredPhotoId(null)}
                onClick={() => handleCardClick(photo)}
              >
                <Image
                  src={photo.imageUrl}
                  alt={lang === "ar" ? photo.titleAr : photo.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImage}
                  style={{
                    filter: `blur(${blurAmount}px) ${
                      focusPeaking ? "drop-shadow(0 0 1px #00ff66) contrast(1.2)" : ""
                    }`,
                  }}
                />

                {/* Loupe Lens Magnifier Glass */}
                {loupeActive && isHovered && (
                  <div
                    className={styles.loupeLens}
                    style={{
                      left: cursorPos.x,
                      top: cursorPos.y,
                      backgroundImage: `url(${photo.imageUrl})`,
                      backgroundPosition: `${cursorPos.pctX}% ${cursorPos.pctY}%`,
                      backgroundSize: "280%",
                    }}
                  >
                    <div className={styles.loupeReticle} />
                  </div>
                )}
              </div>

              {/* Card Meta Body */}
              <div className={styles.cardBody}>
                <div className={styles.cardCategoryRow}>
                  <span className={styles.categoryBadge}>
                    {lang === "ar" ? photo.categoryLabelAr : photo.categoryLabelEn}
                  </span>
                  <span className={styles.formatBadge}>{photo.exif.format}</span>
                </div>

                <h3 className={styles.cardTitle}>
                  {lang === "ar" ? photo.titleAr : photo.titleEn}
                </h3>

                <p className={styles.cardDescription}>
                  {lang === "ar" ? photo.descriptionAr : photo.descriptionEn}
                </p>

                {/* EXIF Readout Strip */}
                <div className={styles.exifStrip}>
                  <span className={styles.exifItem}>📷 {photo.exif.camera}</span>
                  <span className={styles.exifItem}>•</span>
                  <span className={styles.exifItem}>🔭 {photo.exif.lens}</span>
                  <span className={styles.exifItem}>•</span>
                  <span className={styles.exifItem} style={{ color: "var(--accent-gold-bright)" }}>
                    {photo.exif.aperture}
                  </span>
                  <span className={styles.exifItem}>•</span>
                  <span className={styles.exifItem}>{photo.exif.shutter}</span>
                </div>

                {/* Dominant Color Palette */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className={styles.paletteRow} title="Image Dominant Color Swatches">
                    {photo.palette.map((color, idx) => (
                      <div
                        key={idx}
                        className={styles.paletteDot}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCardClick(photo)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--accent-gold)",
                      fontSize: "11px",
                      fontFamily: "var(--font-mono)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Maximize2 size={12} />
                    <span>{lang === "ar" ? "فحص بدقة 8K" : "Inspect 8K"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Darkroom Lightbox Inspection Modal */}
      {selectedPhoto && (
        <div className={styles.modalOverlay} onClick={() => setSelectedPhoto(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div>
                <span style={{ color: "var(--accent-gold-bright)", fontWeight: 700 }}>
                  {lang === "ar" ? selectedPhoto.titleAr : selectedPhoto.titleEn}
                </span>{" "}
                // {selectedPhoto.exif.camera}
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* High-Res View Area */}
            <div className={styles.modalImageArea}>
              <Image
                src={selectedPhoto.imageUrl}
                alt={lang === "ar" ? selectedPhoto.titleAr : selectedPhoto.titleEn}
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Modal Footer Technical Sheet */}
            <div className={styles.modalFooter}>
              <div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  {lang === "ar" ? selectedPhoto.descriptionAr : selectedPhoto.descriptionEn}
                </p>
                <div style={{ display: "flex", gap: "16px", marginTop: "8px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-cyan)" }}>
                  <span>LENS: {selectedPhoto.exif.lens}</span>
                  <span>FOCAL: {selectedPhoto.exif.focalLength}</span>
                  <span>APERTURE: {selectedPhoto.exif.aperture}</span>
                  <span>ISO: {selectedPhoto.exif.iso}</span>
                </div>
              </div>

              <div className={styles.paletteRow}>
                {selectedPhoto.palette.map((color, idx) => (
                  <div
                    key={idx}
                    className={styles.paletteDot}
                    style={{ backgroundColor: color, width: 22, height: 22 }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
