"use client";

import { useState } from "react";

import { Mail, Pause, Phone, Play } from "lucide-react";
import { useTranslations } from "next-intl";

import { Logo } from "@/shared/components/Logo";

import { GrowthTrace } from "../GrowthTrace";
import { ParallaxPanels, type ParallaxVariant } from "../ParallaxPanels";
import { TaglineHighlights } from "../TaglineHighlights";
import { styles } from "./styles/index.styles";

const CONTACT_EMAIL = "alishenriques@gmail.com";
const CONTACT_PHONE = "(11) 98118-4672";

// Three slides: the default dev pitch, AI-assisted development, and turning
// ideas into complete digital products.
const SLIDE_COUNT = 3;
// Slide 2's own accent — see styles/index.styles.ts for the rest of its usages.
const SLIDE2_ACCENT = "#38bdf8";
// Slide 3's own accent: the DS's neon pink tertiary token.
const SLIDE3_ACCENT = "var(--ds-color-tertiary)";
// Per slide: the accent that overrides the default lime (none on slide 1) and its decorations.
const SLIDE_ACCENTS: ReadonlyArray<string | undefined> = [undefined, SLIDE2_ACCENT, SLIDE3_ACCENT];
const SLIDE_DECORATIONS: ReadonlyArray<ParallaxVariant> = ["code", "ai", "ideas"];
const AUTOPLAY_INTERVAL_MS = 12000;

/**
 * The `</>` glyphs double as the slide's prev/next controls, cycling through
 * the default dev-focused pitch, an AI-assisted development pitch and an
 * "ideas into digital products" pitch. Slides 2 and 3 each have their own
 * accent color (blue and neon pink), the deliberate departures from the
 * site's lime palette. The headline/subtitle
 * block, the background glow and the floating parallax decorations change
 * between slides; identity chrome (logo, eyebrow, contact row) stays constant.
 *
 * Autoplay is driven by the progress line itself: the slide advances when its
 * fill animation ends, so the pause button (WCAG 2.2.2) just freezes that
 * animation and resuming picks up exactly where it stopped, keeping the line
 * and the timer in sync. Only the button pauses: hover and focus-within were
 * dropped because they left autoplay stuck (a clicked control keeps focus,
 * and a tap on touch screens fires mouseenter with no matching mouseleave).
 */
export function Hero() {
  const t = useTranslations("HOME");
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const goPrev = () => setSlide((current) => (current + SLIDE_COUNT - 1) % SLIDE_COUNT);
  const goNext = () => setSlide((current) => (current + 1) % SLIDE_COUNT);
  const accent = SLIDE_ACCENTS[slide];

  return (
    <section className={styles.root}>
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
            background: accent,
          }}
          onAnimationEnd={goNext}
        />
      </div>

      <div className={slide === 0 ? styles.glowActive : styles.glow} aria-hidden="true" />
      <div className={slide === 1 ? styles.glow2Active : styles.glow2} aria-hidden="true" />
      <div className={slide === 2 ? styles.glow3Active : styles.glow3} aria-hidden="true" />

      <ParallaxPanels variant={SLIDE_DECORATIONS[slide]} />

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
          ) : slide === 1 ? (
            <h1 key="title-1" className={styles.title2}>
              {t.rich("SLIDE2.HEADLINE", {
                hl: (chunks) => <span className={styles.titleHighlight2}>{chunks}</span>,
              })}
            </h1>
          ) : (
            <h1 key="title-2" className={styles.title3}>
              {t.rich("SLIDE3.HEADLINE", {
                hl: (chunks) => <span className={styles.titleHighlight3}>{chunks}</span>,
              })}
            </h1>
          )}

          <button type="button" className={styles.bracket} onClick={goNext} aria-label={t("SLIDE_NAV.NEXT")}>
            <span aria-hidden="true">{"</>"}</span>
          </button>
        </div>

        <GrowthTrace key={slide} color={accent} />

        <div aria-live="polite" className={styles.slideBody}>
          {slide === 0 ? (
            <p key="body-0" className={styles.subtitle}>
              {t.rich("SUBTITLE", {
                hl: (chunks) => <span className={styles.subtitleHighlight}>{chunks}</span>,
              })}
            </p>
          ) : slide === 1 ? (
            <p key="body-1" className={styles.subtitle}>
              {t.rich("SLIDE2.SUBTITLE", {
                hl: (chunks) => <span className={styles.subtitleHighlight2}>{chunks}</span>,
              })}
            </p>
          ) : (
            <p key="body-2" className={styles.subtitle}>
              {t.rich("SLIDE3.SUBTITLE", {
                hl: (chunks) => <span className={styles.subtitleHighlight3}>{chunks}</span>,
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
                style={index === slide ? { background: accent } : undefined}
                onClick={() => setSlide(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.pauseButton}
            aria-label={paused ? t("SLIDE_NAV.PLAY") : t("SLIDE_NAV.PAUSE")}
            onClick={() => setPaused((current) => !current)}
          >
            {paused ? (
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
