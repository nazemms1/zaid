"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cameraAudio } from "@/utils/cameraAudio";

export type Language = "en" | "ar";
export type GridMode = "none" | "ruleOfThirds" | "goldenRatio";

interface CameraContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  aperture: number; // e.g. 1.2, 2.0, 2.8, 5.6, 11, 16
  setAperture: (val: number) => void;
  focusLevel: number; // 0 (soft bokeh) to 100 (tack sharp)
  setFocusLevel: (val: number) => void;
  gridMode: GridMode;
  setGridMode: (mode: GridMode) => void;
  toggleGridMode: () => void;
  focusPeaking: boolean;
  toggleFocusPeaking: () => void;
  triggerShutter: () => void;
  isFlashing: boolean;
  shutterCount: number;
  hudVisible: boolean;
  toggleHud: () => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  cinemaMode: boolean;
  toggleCinemaMode: () => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export function CameraProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [aperture, setApertureState] = useState<number>(1.8);
  const [focusLevel, setFocusLevelState] = useState<number>(100);
  const [gridMode, setGridMode] = useState<GridMode>("ruleOfThirds");
  const [focusPeaking, setFocusPeaking] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [shutterCount, setShutterCount] = useState<number>(1042);
  const [hudVisible, setHudVisible] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [cinemaMode, setCinemaMode] = useState<boolean>(false);

  // Set HTML dir attribute whenever language changes
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    cameraAudio.playDial();
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    cameraAudio.enabled = next;
    if (next) cameraAudio.playDial();
  };

  const setAperture = (val: number) => {
    setApertureState(val);
    cameraAudio.playDial();
  };

  const setFocusLevel = (val: number) => {
    setFocusLevelState(val);
  };

  const toggleGridMode = () => {
    cameraAudio.playDial();
    setGridMode((prev) => {
      if (prev === "none") return "ruleOfThirds";
      if (prev === "ruleOfThirds") return "goldenRatio";
      return "none";
    });
  };

  const toggleFocusPeaking = () => {
    cameraAudio.playDial();
    setFocusPeaking((prev) => !prev);
  };

  const triggerShutter = () => {
    cameraAudio.playShutter();
    setIsFlashing(true);
    setShutterCount((prev) => prev + 1);
    setTimeout(() => {
      setIsFlashing(false);
    }, 280);
  };

  const toggleHud = () => {
    cameraAudio.playDial();
    setHudVisible((prev) => !prev);
  };

  const toggleCinemaMode = () => {
    cameraAudio.playDial();
    setCinemaMode((prev) => !prev);
  };

  return (
    <CameraContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        soundEnabled,
        toggleSound,
        aperture,
        setAperture,
        focusLevel,
        setFocusLevel,
        gridMode,
        setGridMode,
        toggleGridMode,
        focusPeaking,
        toggleFocusPeaking,
        triggerShutter,
        isFlashing,
        shutterCount,
        hudVisible,
        toggleHud,
        activeFilter,
        setActiveFilter,
        cinemaMode,
        toggleCinemaMode,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
}
