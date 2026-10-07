"use client";

import React from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { ProjectVideo } from "@/data/portfolioData";
import { Play, Sparkles } from "lucide-react";

interface ProjectSlideProps {
  project: ProjectVideo;
  indexNumber: string;
}

export default function ProjectSlide({ project, indexNumber }: ProjectSlideProps) {
  const { lang, openVideoModal } = usePortfolio();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "48px",
        width: "100%",
        maxWidth: "1400px",
        alignItems: "center",
      }}
    >
      {/* Big Cinema Widescreen Box */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: "18px",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95), 0 0 25px rgba(197, 160, 89, 0.12)",
          cursor: "pointer",
          background: "#000",
        }}
        onClick={() => openVideoModal(project.youtubeId)}
      >
        <Image
          src={project.thumbnail}
          alt={lang === "ar" ? project.titleAr : project.titleEn}
          fill
          sizes="(max-width: 900px) 100vw, 850px"
          style={{ objectFit: "cover", opacity: 0.9 }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Play Button */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(197, 160, 89, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            boxShadow: "0 0 40px rgba(197, 160, 89, 0.6)",
            transition: "transform 0.2s ease",
          }}
        >
          <Play size={28} fill="#000" style={{ marginLeft: "4px" }} />
        </div>

        {/* Bottom Tag */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "24px",
            right: "24px",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "#cbd5e1",
          }}
        >
          <span>CINEMA DIRECTING // AKKAD FILMS</span>
          <span style={{ color: "var(--accent-gold-light)" }}>{project.aspectRatio}</span>
        </div>
      </div>

      {/* Project Narrative & Technical Sheet */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--accent-gold)",
          }}
        >
          <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-gold-light)" }}>
            {indexNumber}
          </span>
          <span>//</span>
          <span>{lang === "ar" ? project.categoryAr : project.categoryEn}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h2
          className="serif-title"
          style={{
            fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          {lang === "ar" ? project.titleAr : project.titleEn}
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: "520px",
          }}
        >
          {lang === "ar" ? project.descriptionAr : project.descriptionEn}
        </p>

        {/* Technical Data Card */}
        <div
          style={{
            background: "rgba(14, 16, 22, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>DIRECTOR & ROLE:</span>
            <span style={{ color: "#fff" }}>{lang === "ar" ? project.roleAr : project.roleEn}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>CAMERA ARSENAL:</span>
            <span style={{ color: "var(--accent-gold-light)" }}>{project.camera}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>FINISHING & COLOR:</span>
            <span style={{ color: "#fff" }}>DaVinci Resolve Studio / Film Rec.709</span>
          </div>
        </div>

        {/* Play Action Trigger */}
        <div>
          <button
            type="button"
            onClick={() => openVideoModal(project.youtubeId)}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "30px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "var(--transition-fast)",
            }}
          >
            <Play size={12} fill="#fff" />
            <span>{lang === "ar" ? "مشاهدة العمل بدقة 4K" : "PLAY COMMERCIAL 4K"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
