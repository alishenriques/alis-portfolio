"use client";

import { useEffect, useState } from "react";

import { Check, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Logo } from "@/shared/components/Logo";

import { GrowthTrace } from "../GrowthTrace";
import { ParallaxPanels } from "../ParallaxPanels";
import { TaglineHighlights } from "../TaglineHighlights";
import { styles } from "./styles/index.styles";

const CONTACT_EMAIL = "alishenriques@gmail.com";
const CONTACT_PHONE = "(11) 98118-4672";

// Two slides for now (the default dev pitch, and a freelance-services pitch);
// a real /servicos page is planned (see roadmap.md), which may add a third.
const SLIDE_COUNT = 2;
const SLIDE2_FEATURE_KEYS = ["GBP", "WHATSAPP", "PAGE", "AI"] as const;
// Slide 2's own accent — see styles/index.styles.ts for the rest of its usages.
const SLIDE2_ACCENT = "#38bdf8";
const AUTOPLAY_INTERVAL_MS = 5000;

/**
 * The `</>` glyphs double as the slide's prev/next controls — clicking either
 * one toggles between the default dev-focused pitch and a freelance-services
 * pitch (slide 2's own accent color, blue, is the one deliberate departure
 * from the site's single-accent lime palette). Only the headline/subtitle
 * block and the background glow change between slides; identity chrome
 * (logo, eyebrow, contact row) stays constant.
 */
export function Hero() {
  const t = useTranslations("HOME");
  const [slide, setSlide] = useState(0);

  const goPrev = () => setSlide((current) => (current + SLIDE_COUNT - 1) % SLIDE_COUNT);
  const goNext = () => setSlide((current) => (current + 1) % SLIDE_COUNT);

  // Re-runs (restarting the 5s countdown) on every slide change, including a
  // manual click — so clicking next/prev doesn't feel like it's fighting the
  // autoplay. Skipped entirely under prefers-reduced-motion, same as every
  // other animation in this component.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(goNext, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slide]);

  return (
    <section className={styles.root}>
      <div className={slide === 0 ? styles.glowActive : styles.glow} aria-hidden="true" />
      <div className={slide === 1 ? styles.glow2Active : styles.glow2} aria-hidden="true" />

      <ParallaxPanels />

      <div className={styles.content}>
        <Logo />

        <p className={styles.eyebrow}>{t("EYEBROW")}</p>

        <div className={styles.titleRow}>
          <button type="button" className={styles.bracket} onClick={goPrev} aria-label={t("SLIDE_NAV.PREV")}>
            <span aria-hidden="true">{"</>"}</span>
          </button>

          {slide === 0 ? (
            <h1 key="title-0" className={styles.title}>
              {t.rich("HEADLINE", {
                hl: (chunks) => <span className={styles.titleHighlight}>{chunks}</span>,
                tag: (chunks) => (
                  <span className={styles.titleTag}>
                    <span className={styles.titleTagBracket} aria-hidden="true">
                      {"<"}
                    </span>
                    {chunks}
                    <span className={styles.titleTagBracket} aria-hidden="true">
                      {">"}
                    </span>
                  </span>
                ),
              })}
            </h1>
          ) : (
            <h1 key="title-1" className={styles.title2}>
              {t.rich("SLIDE2.HEADLINE", {
                hl: (chunks) => <span className={styles.titleHighlight2}>{chunks}</span>,
              })}
            </h1>
          )}

          <button type="button" className={styles.bracket} onClick={goNext} aria-label={t("SLIDE_NAV.NEXT")}>
            <span aria-hidden="true">{"</>"}</span>
          </button>
        </div>

        <GrowthTrace key={slide} color={slide === 1 ? SLIDE2_ACCENT : undefined} />

        <div aria-live="polite" className={styles.slideBody}>
          {slide === 0 ? (
            <p key="body-0" className={styles.subtitle}>
              {t.rich("SUBTITLE", {
                hl: (chunks) => <span className={styles.subtitleHighlight}>{chunks}</span>,
              })}
            </p>
          ) : (
            <div key="body-1" className={styles.slide2}>
              <p className={styles.subtitle}>
                {t.rich("SLIDE2.SUBTITLE", {
                  hl: (chunks) => <span className={styles.subtitleHighlight2}>{chunks}</span>,
                })}
              </p>
              <ul className={styles.featureList}>
                {SLIDE2_FEATURE_KEYS.map((key) => (
                  <li key={key} className={styles.featureItem}>
                    <Check size={14} className={styles.featureIcon} aria-hidden="true" />
                    {t(`SLIDE2.FEATURES.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.contactRow}>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.contactItem}>
            <Mail size={16} aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
          <span className={styles.contactSeparator} aria-hidden="true" />
          <a href={`tel:${CONTACT_PHONE.replace(/\D/g, "")}`} className={styles.contactItem}>
            <Phone size={16} aria-hidden="true" />
            {CONTACT_PHONE}
          </a>
        </div>
      </div>

      <TaglineHighlights />
    </section>
  );
}
