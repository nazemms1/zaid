"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import styles from "./DaVinciGradeSlider.module.css";
import { SlidersHorizontal, Layers, Sparkles, Activity } from "lucide-react";

export default function DaVinciGradeSlider() {
  const { lang, focusLevel } = useCamera();
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const demo = PORTFOLIO_DATA.colorGradingDemo;

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(pos);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Optical focus pull effect tied to camera HUD
  const blurAmount = Math.max(0, (100 - focusLevel) * 0.1);

  return (
    <section className={styles.sectionWrapper} id="color-grading">
      <div className={styles.headerArea}>
        <div className={styles.tagline}>
          <Activity size={12} style={{ display: "inline-block", marginRight: 6 }} />
          {lang === "ar" ? "معمل تصحيح الألوان السينمائي" : "Color Mastery & Film Emulation"}
        </div>
        <h2 className={`${styles.title} cinema-title`}>
          {lang === "ar" ? demo.titleAr : demo.titleEn}
        </h2>
        <p className={styles.subtitle}>
          {lang === "ar" ? demo.subtitleAr : demo.subtitleEn}
        </p>
      </div>

      <div className={styles.suiteContainer}>
        {/* DaVinci Window Bar */}
        <div className={styles.suiteHeader}>
          <div className={styles.trafficLights}>
            <div className={styles.lightRed} />
            <div className={styles.lightYellow} />
            <div className={styles.lightGreen} />
          </div>
          <span>DAVINCI RESOLVE STUDIO 19 // NODE GRAPH: [01 LOG_IN] → [02 BAL] → [03 LUT_PRINT]</span>
          <span style={{ color: "var(--accent-gold-bright)" }}>REC.709 D65</span>
        </div>

        {/* Interactive Split Wipe Box */}
        <div
          ref={containerRef}
          className={styles.wipeStage}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onTouchStart={onMouseDown}
          onTouchEnd={onMouseUp}
          onClick={(e) => handleMove(e.clientX)}
        >
          {/* Base Image: Log Profile */}
          <Image
            src={demo.logImage}
            alt="ARRI Log Profile"
            fill
            sizes="(max-width: 1200px) 100vw, 1100px"
            className={`${styles.baseImage} ${styles.logFilter}`}
            style={{
              filter: `contrast(0.68) brightness(1.2) saturate(0.35) blur(${blurAmount}px)`,
            }}
          />

          {/* Graded Image: Clipped from the right */}
          <div
            className={styles.gradedOverlay}
            style={{
              clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`,
            }}
          >
            <Image
              src={demo.gradeImage}
              alt="Graded Rec.709 Master"
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className={`${styles.baseImage} ${styles.gradedFilter}`}
              style={{
                filter: `contrast(1.22) saturate(1.28) brightness(0.98) blur(${blurAmount}px)`,
              }}
            />
          </div>

          {/* Draggable Divider Line */}
          <div
            className={styles.sliderLine}
            style={{ left: `${sliderPos}%` }}
          >
            <div className={styles.sliderHandle}>
              <SlidersHorizontal size={16} />
            </div>
          </div>

          {/* Badges */}
          <div className={styles.labelBadgeLeft}>
            {lang === "ar" ? "كاميرا خام (ARRI LOG)" : demo.logLabel}
          </div>
          <div className={styles.labelBadgeRight}>
            {lang === "ar" ? "ألوان السينما (REC.709 35MM)" : demo.gradeLabel}
          </div>
        </div>

        {/* DaVinci Color Scopes Footer */}
        <div className={styles.scopesFooter}>
          <div className={styles.scopeBox}>
            <div className={styles.scopeLabel}>3D LUT PRINT</div>
            <div className={styles.scopeValue}>{demo.scopes.lutName}</div>
          </div>
          <div className={styles.scopeBox}>
            <div className={styles.scopeLabel}>COLOR SPACE TRANSFORM</div>
            <div className={styles.scopeValue}>{demo.scopes.colorSpace}</div>
          </div>
          <div className={styles.scopeBox}>
            <div className={styles.scopeLabel}>LIFT / GAMMA / GAIN</div>
            <div className={styles.scopeValue}>
              {demo.scopes.lift} / {demo.scopes.gammaVal} / {demo.scopes.gain}
            </div>
          </div>
          <div className={styles.scopeBox}>
            <div className={styles.scopeLabel}>CHROMATIC SATURATION</div>
            <div className={styles.scopeValue} style={{ color: "var(--accent-gold-bright)" }}>
              {demo.scopes.saturation}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
