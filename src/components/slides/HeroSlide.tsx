"use client";

import React from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Play, ArrowDownRight, Award, ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSlide() {
  const { lang, openVideoModal } = usePortfolio();
  const director = PORTFOLIO_DATA.director;
  const showreel2025 = PORTFOLIO_DATA.videos.find((v) => v.id === "showreel-2025") || PORTFOLIO_DATA.videos[0];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: "48px",
        width: "100%",
        maxWidth: "1400px",
        alignItems: "center",
      }}
    >
      {/* Left Column: Typographic Masthead */}
      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        {/* Heritage Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--accent-gold)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <Award size={14} />
          <span>
            {lang === "ar"
              ? "إرث سينمائي عريق // نجل المخرج مصطفى العقاد"
              : "Cinematic Heritage // Son of Director Moustapha Akkad"}
          </span>
        </div>

        {/* Master Heading */}
        <div>
          <h1
            className="serif-title"
            style={{
              fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            {lang === "ar" ? director.nameAr : director.nameEn}
          </h1>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1rem",
              color: "var(--accent-gold-light)",
              letterSpacing: "0.15em",
              marginTop: "8px",
              textTransform: "uppercase",
            }}
          >
            {lang === "ar" ? director.companyAr : director.companyEn}
          </div>
        </div>

        {/* Bio Narrative */}
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: "600px",
          }}
        >
          {lang === "ar" ? director.bioAr : director.bioEn}
        </p>

        {/* Director Philosophy Quote */}
        <div
          style={{
            fontStyle: "italic",
            color: "var(--accent-gold-light)",
            fontSize: "1rem",
            padding: "12px 18px",
            borderRadius: "8px",
            background: "rgba(197, 160, 89, 0.08)",
            borderLeft: lang === "ar" ? "none" : "3px solid var(--accent-gold)",
            borderRight: lang === "ar" ? "3px solid var(--accent-gold)" : "none",
            maxWidth: "580px",
          }}
        >
          {lang === "ar" ? director.quoteAr : director.quoteEn}
        </div>

        {/* Action Button & Scroll Prompt */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => openVideoModal(showreel2025.youtubeId)}
            style={{
              background: "var(--accent-gold)",
              color: "#000000",
              border: "none",
              padding: "16px 32px",
              borderRadius: "40px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(197, 160, 89, 0.35)",
              transition: "var(--transition-fast)",
            }}
          >
            <Play size={14} fill="#000" />
            <span>
              {lang === "ar" ? "مشاهدة الشوريـل 2025" : "WATCH MASTER SHOWREEL 2025"}
            </span>
          </button>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>{lang === "ar" ? "مرّر للأسفل للتصفح أفقياً" : "SCROLL DOWN TO EXPLORE"}</span>
            <span style={{ color: "var(--accent-gold)" }}>{lang === "ar" ? "←" : "→"}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Video Teaser Box */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(197, 160, 89, 0.15)",
          cursor: "pointer",
          background: "#000",
        }}
        onClick={() => openVideoModal(showreel2025.youtubeId)}
      >
        <Image
          src={showreel2025.thumbnail}
          alt="Akkad Films Showreel 2025"
          fill
          sizes="(max-width: 900px) 100vw, 700px"
          style={{ objectFit: "cover", opacity: 0.85 }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Center Play Circle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "74px",
            height: "74px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
            transition: "transform 0.2s ease",
          }}
        >
          <Play size={24} fill="#ffffff" style={{ marginLeft: "3px" }} />
        </div>

        {/* Video Card Badges */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "24px",
            right: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "#fff",
          }}
        >
          <div>
            <div style={{ color: "var(--accent-gold-light)", fontWeight: 700 }}>
              {lang === "ar" ? showreel2025.titleAr : showreel2025.titleEn}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "10px", marginTop: "2px" }}>
              ARRI ALEXA MINI LF // ANAMORPHIC SCOPE
            </div>
          </div>

          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            2025 REEL
          </div>
        </div>
      </div>
    </div>
  );
}
