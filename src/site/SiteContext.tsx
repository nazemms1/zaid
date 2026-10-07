"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "ar";

interface SiteCtx {
  lang: Lang;
  dir: "ltr" | "rtl";
  toggleLang: () => void;
  tr: (en: string, ar: string) => string;
  ready: boolean;
  setReady: (v: boolean) => void;
  videoId: string | null;
  openVideo: (id: string) => void;
  closeVideo: () => void;
}

const Ctx = createContext<SiteCtx | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [ready, setReady] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "ar" : "en")), []);
  const tr = useCallback((en: string, ar: string) => (lang === "ar" ? ar : en), [lang]);
  const openVideo = useCallback((id: string) => setVideoId(id), []);
  const closeVideo = useCallback(() => setVideoId(null), []);

  const value = useMemo<SiteCtx>(
    () => ({ lang, dir, toggleLang, tr, ready, setReady, videoId, openVideo, closeVideo }),
    [lang, dir, toggleLang, tr, ready, videoId, openVideo, closeVideo]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSite must be used inside SiteProvider");
  return c;
}
