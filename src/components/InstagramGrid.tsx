"use client";

import React from "react";
import Image from "next/image";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import styles from "./InstagramGrid.module.css";
import { Heart, MessageCircle, ExternalLink, Check } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

export default function InstagramGrid() {
  const { lang } = useCamera();
  const igPosts = PORTFOLIO_DATA.instagramFeed;
  const director = PORTFOLIO_DATA.director;

  return (
    <section className={styles.sectionWrapper} id="instagram">
      {/* Instagram Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.profileLeft}>
          <div className={styles.avatarRing}>
            <div className={styles.avatarInner}>ZA</div>
          </div>

          <div className={styles.profileMeta}>
            <div className={styles.handleRow}>
              <span className={styles.handleText}>{director.contact.instagramHandle}</span>
              <div className={styles.verifiedBadge} title="Verified Profile">
                <Check size={10} strokeWidth={3} />
              </div>
            </div>
            <p className={styles.bioSnippet}>
              {lang === "ar"
                ? "المخرج ومدير التصوير السينمائي زيد العقاد // إنتاج أفلام وإعلانات تجارية فاخرة"
                : "Film Director & Cinematographer // Commercials & Cinema Productions"}
            </p>
          </div>
        </div>

        <a
          href={director.contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.followBtn}
        >
          <InstagramIcon size={16} />
          <span>{lang === "ar" ? "متابعة على إنستغرام" : "Follow on Instagram"}</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Grid of Instagram Posts */}
      <div className={styles.igGrid}>
        {igPosts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.igCard}
          >
            <Image
              src={post.imageUrl}
              alt="Instagram post"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={styles.igImage}
            />

            <div className={styles.igOverlay}>
              <div className={styles.igStats}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Heart size={14} fill="#fff" /> {post.likes}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <MessageCircle size={14} fill="#fff" /> {post.comments}
                </span>
              </div>
              <p className={styles.igCaption}>
                {lang === "ar" ? post.captionAr : post.captionEn}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
