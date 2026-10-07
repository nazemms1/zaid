"use client";

import React from "react";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Film, Mail, Phone, ArrowUp } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/Icons";

export default function Footer() {
  const { lang } = useCamera();
  const director = PORTFOLIO_DATA.director;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#040507",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "60px 24px 100px", // extra bottom padding for floating camera HUD dock
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: "420px" }}>
            <h3
              className="cinema-title"
              style={{
                fontSize: "1.5rem",
                color: "#fff",
                letterSpacing: "0.08em",
                marginBottom: "6px",
              }}
            >
              {lang === "ar" ? director.companyAr : director.companyEn}
            </h3>
            <p
              style={{
                color: "var(--accent-gold)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                marginBottom: "12px",
              }}
            >
              {lang === "ar" ? director.nameAr : director.nameEn} // {lang === "ar" ? director.titleAr : director.titleEn}
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
              {lang === "ar"
                ? "شركة إنتاج إعلامي وسينمائي تصنع محتوى مرئياً عالمياً للمنصات الرقمية والتلفزيون والسينما. مقرها إسطنبول مع فروع في دبي والرياض والكويت والدوحة."
                : "A premier creative media production company crafting high-concept visual narratives for Cinema, TV, Web, and luxury international brands."}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--accent-gold)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                {lang === "ar" ? "الأقسام الرئيسية" : "NAVIGATION"}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <li><a href="#showreel" style={{ transition: "color 0.2s" }}>{lang === "ar" ? "الشوريـل الرئيسي 2025" : "Master Showreel 2025"}</a></li>
                <li><a href="#gallery">{lang === "ar" ? "معرض الأعمال الفاخرة" : "Still Masterworks"}</a></li>
                <li><a href="#color-grading">{lang === "ar" ? "استوديو دافينشي للألوان" : "DaVinci Color Suite"}</a></li>
                <li><a href="#filmstrip">{lang === "ar" ? "شريط الفيلم 35 مم" : "35mm Negative Reel"}</a></li>
                <li><a href="#commercials">{lang === "ar" ? "إعلانات التلفزيون الفاخرة" : "Commercial TVCs"}</a></li>
                <li><a href="#about">{lang === "ar" ? "الإرث والمعدات" : "Heritage & Gear"}</a></li>
              </ul>
            </div>

            {/* Socials & Connect */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--accent-gold)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                {lang === "ar" ? "التواصل والمتابعة" : "CONNECT"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <a
                  href={director.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <InstagramIcon size={14} color="#e1306c" />
                  <span>Instagram @zaid.akkad</span>
                </a>
                <a
                  href={director.contact.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <YoutubeIcon size={14} color="#ff0000" />
                  <span>YouTube / Akkad Pictures</span>
                </a>
                <a
                  href={`mailto:${director.contact.email}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <Mail size={14} style={{ color: "var(--accent-gold)" }} />
                  <span>{director.contact.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#fff",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "var(--transition-fast)",
            }}
            title="Back to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Bottom Credits */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
          }}
        >
          <div>
            © {new Date().getFullYear()} AKKAD PICTURES. ALL RIGHTS RESERVED.
          </div>
          <div>
            CINEMA PEDIGREE • ISTANBUL // DUBAI // RIYADH // KUWAIT // DOHA
          </div>
        </div>
      </div>
    </footer>
  );
}
