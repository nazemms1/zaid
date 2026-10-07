"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

interface PortfolioContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  activeVideoId: string | null;
  openVideoModal: (youtubeId: string) => void;
  closeVideoModal: () => void;
  activeSlideIndex: number;
  setActiveSlideIndex: (idx: number) => void;
  totalSlides: number;
  setTotalSlides: (total: number) => void;
  scrollToSlide: (idx: number) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar"); // Default to Arabic as requested by user, with EN toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(8);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === "en" ? "ar" : "en"));
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const openVideoModal = (youtubeId: string) => {
    setActiveVideoId(youtubeId);
  };

  const closeVideoModal = () => {
    setActiveVideoId(null);
  };

  const scrollToSlide = (idx: number) => {
    // Will be connected to the horizontal scroller
    const targetEl = document.getElementById(`slide-${idx}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        soundEnabled,
        toggleSound,
        activeVideoId,
        openVideoModal,
        closeVideoModal,
        activeSlideIndex,
        setActiveSlideIndex,
        totalSlides,
        setTotalSlides,
        scrollToSlide,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
