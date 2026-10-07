"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/siteData";
import { useSite } from "./SiteContext";
import { scrollToId } from "./Header";
import { MaskLines, Reveal } from "./ui";

export default function Contact() {
  const { tr } = useSite();
  const c = SITE.contact;
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project inquiry — ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="contact">
      <small className="eyebrow">{tr("Let's work together", "لنعمل معًا")}</small>
      <MaskLines className="contact-title" lines={[tr("Have a story", "لديك قصة"), tr("to tell?", "تريد أن تُروى؟")]} />

      <Reveal delay={0.1}>
        <a href={`mailto:${c.email}`} className="mail-link" data-cursor={tr("WRITE", "راسلنا")} dir="ltr">
          <span>{c.email}</span>
          <span aria-hidden>{c.email}</span>
          <ArrowUpRight className="mail-arrow" />
        </a>
      </Reveal>

      <div className="contact-grid">
        <Reveal>
          <ul className="contact-list">
            <li><small>WhatsApp</small><a href={c.whatsappLink} target="_blank" rel="noreferrer" dir="ltr">{c.whatsapp}</a></li>
            <li><small>Instagram</small><a href={c.instagram} target="_blank" rel="noreferrer">{c.instagramHandle}</a></li>
            <li><small>YouTube</small><a href={c.youtube} target="_blank" rel="noreferrer">Akkad Pictures</a></li>
            <li>
              <small>{tr("Offices", "المكاتب")}</small>
              <span>{SITE.hubs.map((h) => tr(h.en, h.ar)).join(" · ")}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <form className="form" onSubmit={submit}>
            <label>
              <span>{tr("Your name", "الاسم")}</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              <span>{tr("Email", "البريد الإلكتروني")}</span>
              <input name="email" type="email" required autoComplete="email" dir="ltr" />
            </label>
            <label>
              <span>{tr("About the project", "عن المشروع")}</span>
              <textarea name="message" rows={4} required />
            </label>
            <motion.button type="submit" className="send" whileTap={{ scale: 0.97 }} data-cursor={tr("SEND", "إرسال")}>
              {sent ? tr("Opening your mail app…", "جارٍ فتح البريد…") : tr("Send inquiry", "إرسال الطلب")}
              <ArrowUpRight size={18} />
            </motion.button>
          </form>
        </Reveal>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Akkad Pictures. All rights reserved.</span>
        <button onClick={() => scrollToId("top")}>{tr("Back to top ↑", "العودة للأعلى ↑")}</button>
      </footer>
    </section>
  );
}
