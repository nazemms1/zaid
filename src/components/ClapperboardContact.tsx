"use client";

import React, { useState } from "react";
import { useCamera } from "@/context/CameraContext";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { cameraAudio } from "@/utils/cameraAudio";
import styles from "./ClapperboardContact.module.css";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Clapperboard } from "lucide-react";

export default function ClapperboardContact() {
  const { lang, triggerShutter } = useCamera();
  const director = PORTFOLIO_DATA.director;

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    projectType: "commercial",
    location: "Istanbul",
    timeline: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerShutter();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        clientName: "",
        email: "",
        projectType: "commercial",
        location: "Istanbul",
        timeline: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <section className={styles.sectionWrapper} id="contact">
      <div className={styles.headerArea}>
        <div className={styles.tagline}>
          <Clapperboard size={12} style={{ display: "inline-block", marginRight: 6 }} />
          {lang === "ar" ? "حجز واستشارات الإنتاج" : "Production Inquiries & Booking"}
        </div>
        <h2 className={`${styles.title} cinema-title`}>
          {lang === "ar" ? "ابدأ مشروعك السينمائي القادم" : "Initiate Your Next Production"}
        </h2>
        <p className={styles.subtitle}>
          {lang === "ar"
            ? "جاهزون للتعاون مع العلامات التجارية الرفيعة واستوديوهات السينما في كافة العواصم العالمية."
            : "Direct inquiry for luxury commercial TVCs, cinema directing, still campaigns, and color mastering."}
        </p>
      </div>

      {/* Clapperboard Slate */}
      <div className={styles.clapperSlate}>
        {/* Top Striped Clapper Stick */}
        <div className={styles.clapperHinge} onClick={triggerShutter} title="Click Clapper Slate">
          <div className={styles.hingeNut} />
          <span style={{ color: "#fff", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textShadow: "0 0 8px #000" }}>
            PRODUCTION SLATE // AKKAD FILMS
          </span>
        </div>

        {/* Clapper Body */}
        <form className={styles.slateBody} onSubmit={handleSubmit}>
          {isSubmitted ? (
            <div style={{ padding: "40px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <CheckCircle2 size={48} style={{ color: "var(--accent-gold)" }} />
              <h3 style={{ fontSize: "1.4rem", color: "#fff" }}>
                {lang === "ar" ? "تم تسجيل طلب الإنتاج بنجاح!" : "Production Slate Logged Successfully!"}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                {lang === "ar"
                  ? "سيتواصل معك فريق مكتب المخرج زيد العقاد في أقرب وقت."
                  : "Director Zaid Akkad's production office will be in touch shortly."}
              </p>
            </div>
          ) : (
            <>
              <div className={styles.fieldsGrid}>
                {/* Client / Production Name */}
                <div className={styles.fieldItem}>
                  <label className={styles.fieldLabel}>
                    {lang === "ar" ? "الجهة / العلامة التجارية (PRODUCTION)" : "PRODUCTION / BRAND"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "ar" ? "اسم الشركة أو الوكالة" : "e.g. Brand / Agency Name"}
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className={styles.inputControl}
                  />
                </div>

                {/* Email */}
                <div className={styles.fieldItem}>
                  <label className={styles.fieldLabel}>
                    {lang === "ar" ? "البريد الإلكتروني (CONTACT EMAIL)" : "CONTACT EMAIL"}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.inputControl}
                  />
                </div>

                {/* Scene / Project Type */}
                <div className={styles.fieldItem}>
                  <label className={styles.fieldLabel}>
                    {lang === "ar" ? "نوع المشروع (SCENE / CATEGORY)" : "SCENE / CATEGORY"}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className={styles.selectControl}
                  >
                    <option value="commercial">Commercial TVC (إعلان تجاري)</option>
                    <option value="luxury-product">Luxury Product & Watches (ساعات ومنتجات فاخرة)</option>
                    <option value="cinema-narrative">Cinema Narrative / Doc (عمل سينمائي / وثائقي)</option>
                    <option value="color-grading">DaVinci Color Grading (تدريج وتصحيح ألوان)</option>
                    <option value="editorial">Editorial / High Fashion (أزياء وبورتريه)</option>
                  </select>
                </div>

                {/* Location Hub */}
                <div className={styles.fieldItem}>
                  <label className={styles.fieldLabel}>
                    {lang === "ar" ? "موقع التصوير (LOCATION HUB)" : "LOCATION HUB"}
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={styles.selectControl}
                  >
                    <option value="Istanbul">Istanbul, Turkey (إسطنبول)</option>
                    <option value="Dubai">Dubai, UAE (دبي)</option>
                    <option value="Riyadh">Riyadh, KSA (الرياض)</option>
                    <option value="Kuwait">Kuwait City (الكويت)</option>
                    <option value="Doha">Doha, Qatar (الدوحة)</option>
                    <option value="International">International / Worldwide</option>
                  </select>
                </div>

                {/* Project Brief */}
                <div className={styles.fieldItemFull}>
                  <label className={styles.fieldLabel}>
                    {lang === "ar" ? "تفاصيل العمل والرؤية الإخراجية (DIRECTOR'S BRIEF)" : "DIRECTOR'S BRIEF & TIMELINE"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={lang === "ar" ? "اكتب نبذة عن المشروع، الميزانية المقترحة، والجدول الزمني..." : "Describe the creative vision, dates, and budget tier..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={styles.textareaControl}
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Send size={16} />
                <span>{lang === "ar" ? "إرسال لوحة الطلب (SLATE DISPATCH)" : "DISPATCH PRODUCTION INQUIRY"}</span>
              </button>
            </>
          )}
        </form>
      </div>

      {/* Direct Contact Links */}
      <div className={styles.directContacts}>
        <a
          href={`https://wa.me/905010000411`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactBadge}
        >
          <MessageSquare size={14} style={{ color: "#25d366" }} />
          <span>WhatsApp: +90 50 10000 411</span>
        </a>

        <a href={`mailto:${director.contact.email}`} className={styles.contactBadge}>
          <Mail size={14} style={{ color: "var(--accent-gold)" }} />
          <span>{director.contact.email}</span>
        </a>

        <a href={`tel:+905010000411`} className={styles.contactBadge}>
          <Phone size={14} style={{ color: "var(--accent-cyan)" }} />
          <span>+90 50 10000 411</span>
        </a>
      </div>
    </section>
  );
}
