"use client";

import { SiteProvider, useSite } from "@/site/SiteContext";
import SmoothScroll from "@/site/SmoothScroll";
import Cursor from "@/site/Cursor";
import Preloader from "@/site/Preloader";
import Header from "@/site/Header";
import Hud from "@/site/Hud";
import Hero from "@/site/Hero";
import Marquee from "@/site/Marquee";
import Films from "@/site/Films";
import Reels from "@/site/Reels";
import InstaGallery from "@/site/InstaGallery";
import About from "@/site/About";
import Contact from "@/site/Contact";
import VideoModal from "@/site/VideoModal";

function Page() {
  const { dir } = useSite();
  return (
    <div dir={dir} className="site">
      <SmoothScroll />
      <Cursor />
      <Preloader />
      <Header />
      <Hud />
      <main>
        <Hero />
        <Marquee />
        <Films />
        <Reels />
        <InstaGallery />
        <About />
        <Contact />
      </main>
      <VideoModal />
    </div>
  );
}

export default function Home() {
  return (
    <SiteProvider>
      <Page />
    </SiteProvider>
  );
}
