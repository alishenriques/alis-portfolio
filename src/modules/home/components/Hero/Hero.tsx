"use client";

import { type FocusEvent, useState } from "react";

import { Mail, Pause, Phone, Play } from "lucide-react";
import { useTranslations } from "next-intl";

import { Logo } from "@/shared/components/Logo";

import { GrowthTrace } from "../GrowthTrace";
import { ParallaxPanels } from "../ParallaxPanels";
import { TaglineHighlights } from "../TaglineHighlights";
import { styles } from "./styles/index.styles";

const CONTACT_EMAIL = "alishenriques@gmail.com";
const CONTACT_PHONE = "(11) 98118-4672";

// Two slides: the default dev pitch, and AI-assisted development.
const SLIDE_COUNT = 2;
// Slide 2's own accent — see styles/index.styles.ts for the rest of its usages.
const SLIDE2_ACCENT = "#38bdf8";
const AUTOPLAY_INTERVAL_MS = 12000;

/**
 * The `</>` glyphs double as the slide's prev/next controls — clicking either
 * one toggles between the default dev-focused pitch and an AI-assisted
 * development pitch (slide 2's own accent color, blue, is the one deliberate
 * departure from the site's single-accent lime palette). The headline/subtitle
 * block, the background glow and the floating parallax decorations change
 * between slides; identity chrome (logo, eyebrow, contact row) stays constant.
 *
 * Autoplay is driven by the progress line itself: the slide advances when its
 * fill animation ends, so pausing (hover, keyboard focus inside the hero, or
 * the pause button, per WCAG 2.2.2) just freezes that animation and resuming
 * picks up exactly where it stopped, keeping the line and the timer in sync.
 */
export function Hero() {
  const t = useTranslations("HOME");
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const paused = hovered || focusWithin || pausedByUser;

  const goPrev = () => setSlide((current) => (current + SLIDE_COUNT - 1) % SLIDE_COUNT);
  const goNext = () => setSlide((current) => (current + 1) % SLIDE_COUNT);

  // Focus moving between controls inside the hero bubbles a blur then a
  // focus; only count it as leaving when the next target is outside.
  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
  };

  return (
    <section
      className={styles.root}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={handleBlur}
    >
      {/* The fill is keyed by slide, so its animation (and the countdown)
          restarts on every change, including a manual click — clicking
          next/prev doesn't feel like it's fighting the autoplay. Hidden
          under prefers-reduced-motion, which turns autoplay off entirely,
          same as every other animation in this component. */}
      <div className={styles.progressTrack} aria-hidden="true">
        <div
          key={slide}
          data-testid="hero-progress"
          className={styles.progressFill}
          style={{
            animationDuration: `${AUTOPLAY_INTERVAL_MS}ms`,
            animationPlayState: paused ? "paused" : "running",
            background: slide === 1 ? SLIDE2_ACCENT : undefined,
          }}
          onAnimationEnd={goNext}
        />
      </div>

      <div className={slide === 0 ? styles.glowActive : styles.glow} aria-hidden="true" />
      <div className={slide === 1 ? styles.glow2Active : styles.glow2} aria-hidden="true" />

      <ParallaxPanels variant={slide === 1 ? "ai" : "code"} />

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
            <p key="body-1" className={styles.subtitle}>
              {t.rich("SLIDE2.SUBTITLE", {
                hl: (chunks) => <span className={styles.subtitleHighlight2}>{chunks}</span>,
              })}
            </p>
          )}
        </div>

        <div className={styles.slideControls}>
          <div className={styles.dots} role="tablist" aria-label={t("SLIDE_NAV.LABEL")}>
            {Array.from({ length: SLIDE_COUNT }, (_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={slide === index}
                aria-label={t("SLIDE_NAV.GOTO", { number: index + 1 })}
                className={index === slide ? styles.dotActive : styles.dot}
                style={index === slide ? { background: slide === 1 ? SLIDE2_ACCENT : undefined } : undefined}
                onClick={() => setSlide(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.pauseButton}
            aria-label={pausedByUser ? t("SLIDE_NAV.PLAY") : t("SLIDE_NAV.PAUSE")}
            onClick={() => setPausedByUser((current) => !current)}
          >
            {pausedByUser ? (
              <Play size={12} fill="currentColor" aria-hidden="true" />
            ) : (
              <Pause size={12} fill="currentColor" aria-hidden="true" />
            )}
          </button>
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
