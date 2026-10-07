"use client";

import React, { useState, useEffect } from "react";
import { useCamera } from "@/context/CameraContext";
import styles from "./CameraHUD.module.css";
import {
  Camera,
  Grid,
  Volume2,
  VolumeX,
  Languages,
  Eye,
  Sliders,
  Sparkles,
  Maximize2,
  Minimize2,
} from "lucide-react";

export default function CameraHUD() {
  const {
    lang,
    toggleLang,
    soundEnabled,
    toggleSound,
    aperture,
    setAperture,
    focusLevel,
    setFocusLevel,
    gridMode,
    toggleGridMode,
    focusPeaking,
    toggleFocusPeaking,
    triggerShutter,
    isFlashing,
    shutterCount,
    hudVisible,
    toggleHud,
  } = useCamera();

  const [timecode, setTimecode] = useState("01:24:19:08");

  // Live SMPTE cinema timecode clock simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, "0");
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 41); // ~24 fps
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mechanical White Flash Screen Overlay on Shutter Click */}
      <div
        className={`${styles.flashOverlay} ${isFlashing ? "shutter-flash-active" : ""}`}
      />

      {/* Viewfinder 4-Corner Brackets */}
      {hudVisible && (
        <>
          <div className={styles.cornerTL} />
          <div className={styles.cornerTR} />
          <div className={styles.cornerBL} />
          <div className={styles.cornerBR} />
        </>
      )}

      {/* Rule of Thirds / Framing Overlay */}
      {hudVisible && gridMode === "ruleOfThirds" && (
        <div className={styles.gridOverlay}>
          <div className={styles.ruleOfThirds}>
            <div /><div /><div />
            <div /><div /><div />
            <div /><div /><div />
          </div>
        </div>
      )}

      {/* Center Camera Crosshair */}
      {hudVisible && (
        <div className={styles.centerCrosshair}>
          <div className={styles.centerCircle} />
        </div>
      )}

      {/* Top Professional Viewfinder Bar */}
      {hudVisible && (
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <span className={styles.recBadge}>
              <span className={styles.recDot} />
              REC
            </span>
            <span>TC {timecode}</span>
            <span style={{ color: "var(--accent-gold-bright)" }}>
              ZAID AKKAD // CINE-LF
            </span>
          </div>

          <div className={styles.topBarCenter}>
            <span>FPS: 24.000</span>
            <span>SHUTTER: 1/48 (180°)</span>
            <span>ISO: 800</span>
            <div className={styles.vuMeter} title="Audio Level Meters">
              <div className={styles.vuBar} />
              <div className={styles.vuBar} />
              <div className={styles.vuBar} />
            </div>
          </div>

          <div className={styles.topBarRight}>
            <span>RAW+PRORES</span>
            <span style={{ color: "var(--accent-cyan)" }}>
              EXP: #{shutterCount}
            </span>
            <span>BAT: 88%</span>
          </div>
        </div>
      )}

      {/* Bottom Floating Tactical Camera Dock */}
      <div className={styles.bottomDock}>
        {/* Shutter Snap Action Button */}
        <button
          type="button"
          className={styles.shutterButton}
          onClick={triggerShutter}
          title={lang === "ar" ? "التقاط صورة (صوت الغالق والوميض)" : "Take Shot (Mechanical Shutter Flash)"}
          aria-label="Camera Shutter Trigger"
        >
          <div className={styles.shutterInnerRing} />
        </button>

        <div className={styles.dockDivider} />

        {/* Focus Pull Ring (Optical Bokeh Control) */}
        <div className={styles.focusPuller}>
          <Sliders size={13} style={{ color: "var(--accent-gold)" }} />
          <span>{lang === "ar" ? "الفوكس" : "FOCUS"}: {focusLevel}%</span>
          <input
            type="range"
            min="10"
            max="100"
            value={focusLevel}
            onChange={(e) => setFocusLevel(Number(e.target.value))}
            className={styles.focusSlider}
            title={lang === "ar" ? "سحب الفوكس اليدوي" : "Manual Focus Pull"}
          />
        </div>

        <div className={styles.dockDivider} />

        {/* Aperture F-Stop Selector */}
        <div className={styles.dockGroup}>
          {[1.2, 2.8, 5.6, 11].map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.dockButton} ${aperture === f ? styles.dockButtonActive : ""}`}
              onClick={() => setAperture(f)}
              title={`Aperture f/${f}`}
            >
              f/{f}
            </button>
          ))}
        </div>

        <div className={styles.dockDivider} />

        {/* Viewfinder Grid Mode */}
        <button
          type="button"
          className={`${styles.dockButton} ${gridMode !== "none" ? styles.dockButtonActive : ""}`}
          onClick={toggleGridMode}
          title={lang === "ar" ? "شبكة التكوين السينمائي" : "Framing Grid Overlay"}
        >
          <Grid size={13} />
          <span>{gridMode === "none" ? "GRID OFF" : "3x3"}</span>
        </button>

        {/* Focus Peaking */}
        <button
          type="button"
          className={`${styles.dockButton} ${focusPeaking ? styles.dockButtonActive : ""}`}
          onClick={toggleFocusPeaking}
          title={lang === "ar" ? "تحديد الحواف الحادة (Focus Peaking)" : "Focus Peaking Highlights"}
        >
          <Sparkles size={13} />
          <span>{focusPeaking ? "PEAK ON" : "PEAK"}</span>
        </button>

        <div className={styles.dockDivider} />

        {/* Sound SFX */}
        <button
          type="button"
          className={styles.dockButton}
          onClick={toggleSound}
          title={soundEnabled ? "Mute Camera SFX" : "Unmute Camera SFX"}
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </button>

        {/* Language Switcher */}
        <button
          type="button"
          className={`${styles.dockButton} ${styles.dockButtonActive}`}
          onClick={toggleLang}
          title="Toggle Language (العربية / English)"
        >
          <Languages size={13} />
          <span>{lang === "en" ? "عربي" : "EN"}</span>
        </button>

        {/* HUD Visibility Toggle */}
        <button
          type="button"
          className={styles.dockButton}
          onClick={toggleHud}
          title={hudVisible ? "Hide Viewfinder HUD" : "Show Viewfinder HUD"}
        >
          {hudVisible ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
        </button>
      </div>
    </>
  );
}
