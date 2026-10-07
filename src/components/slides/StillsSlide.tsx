"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA, PhotographItem } from "@/data/portfolioData";
import { Maximize2, X, Sparkles } from "lucide-react";

export default function StillsSlide() {
  const { lang } = usePortfolio();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotographItem | null>(null);

  const photos = PORTFOLIO_DATA.photographs.slice(0, 6);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        width: "100%",
        padding: "0 40px",
      }}
    >
      {/* Slide Heading */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--accent-gold)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            04 // STILL MASTERWORKS & 8K OPTICS
          </div>
          <h2 className="serif-title" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#fff" }}>
            {lang === "ar" ? "معرض الأعمال الفوتوغرافية الحصرية" : "Selected Still Masterworks"}
          </h2>
        </div>

        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "480px", lineHeight: 1.6 }}>
          {lang === "ar"
            ? "تصوير المنتجات الفاخرة، البورتريه السينمائي بمستشعرات 100 ميغابكسل، وديناميكية السوائل السريعة."
            : "Hasselblad 100MP medium format, luxury horology macro, and high-speed motion photography."}
        </p>
      </div>

      {/* Horizontal Staggered Photos Row */}
      <div
        style={{
          display: "flex",
          gap: "28px",
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {photos.map((item) => (
          <div
            key={item.id}
            style={{
              width: "360px",
              flexShrink: 0,
              background: "#0d0f15",
              borderRadius: "14px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s ease, border-color 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => setSelectedPhoto(item)}
          >
            {/* Image Box */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "260px",
                background: "#000",
                overflow: "hidden",
              }}
            >
              <Image
                src={item.imageUrl}
                alt={lang === "ar" ? item.titleAr : item.titleEn}
                fill
                sizes="360px"
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
              />

              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--accent-gold-light)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {item.exif.format}
              </div>
            </div>

            {/* Meta Information */}
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--accent-gold)",
                  textTransform: "uppercase",
                }}
              >
                {lang === "ar" ? item.categoryLabelAr : item.categoryLabelEn}
              </div>

              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                {lang === "ar" ? item.titleAr : item.titleEn}
              </h3>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "10px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--text-muted)",
                }}
              >
                <span>{item.exif.focalLength}</span>
                <span style={{ color: "var(--accent-gold-light)" }}>{item.exif.aperture}</span>
                <span>{item.exif.shutter}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4, 5, 8, 0.96)",
            backdropFilter: "blur(20px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1100px",
              width: "100%",
              background: "#0c0e14",
              borderRadius: "16px",
              border: "1px solid rgba(197, 160, 89, 0.35)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--accent-gold-light)",
              }}
            >
              <span>{lang === "ar" ? selectedPhoto.titleAr : selectedPhoto.titleEn}</span>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ position: "relative", width: "100%", height: "60vh", background: "#000" }}>
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.titleEn}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-secondary)",
              }}
            >
              <div>
                CAMERA: {selectedPhoto.exif.camera} // LENS: {selectedPhoto.exif.lens}
              </div>
              <div style={{ color: "var(--accent-gold)" }}>
                {selectedPhoto.exif.aperture} • {selectedPhoto.exif.shutter} • ISO {selectedPhoto.exif.iso}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
