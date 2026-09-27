import { Avatar, Eyebrow, Quote } from "@alishenriques/design-system";
import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getProfile } from "@/lib/portfolio";
import { estimateReadingMinutes, parseBio, renderInlineMarkup } from "@/lib/richText";
import { VideoEmbed } from "@/shared/components/VideoEmbed";

import { styles } from "./styles/index.styles";

export async function About() {
  const [profile, t] = await Promise.all([getProfile(), getTranslations("ABOUT")]);
  const blocks = parseBio(profile.bio);
  const headings = blocks.filter((block) => block.type === "heading");
  const readingMinutes = estimateReadingMinutes(profile.bio);

  return (
    <main className={styles.root}>
      <div className={styles.header}>
        {profile.avatarUrl && (
          <Avatar
            src={profile.avatarUrl}
            alt={profile.name}
            size={144}
            // The source photo is a tall portrait; a centred crop clips the
            // hairline, so anchor the crop (and the expanded view) to the top.
            objectPosition="top"
            closeLabel={t("CLOSE_PHOTO")}
            className={styles.avatar}
          />
        )}
        <div>
          <Eyebrow>{t("TITLE")}</Eyebrow>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.headline}>{profile.headline}</p>
          <p className={styles.education}>
            <span className={styles.educationLabel}>{t("EDUCATION_LABEL")}</span>
            {t("EDUCATION_VALUE")}
          </p>
        </div>
      </div>

      <section className={styles.videoSection} aria-labelledby="about-video-heading">
        <h2 id="about-video-heading" className={styles.videoHeading}>
          {t("VIDEO_TITLE")}
        </h2>
        <VideoEmbed title={t("VIDEO_TITLE")} comingSoonText={t("VIDEO_COMING_SOON")} />
      </section>

      <div className={styles.bioMeta}>
        <p className={styles.readingTime}>
          <Clock size={14} aria-hidden="true" />
          {t("READING_TIME", { minutes: readingMinutes })}
        </p>

        {headings.length > 0 && (
          <nav aria-label={t("TOC_LABEL")} className={styles.toc}>
            <p className={styles.tocTitle}>{t("TOC_TITLE")}</p>
            <ul className={styles.tocList}>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className={styles.tocLink}>
                    <span aria-hidden="true">{">"}</span>
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className={styles.bioSection}>
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2 key={index} id={block.id} className={styles.bioHeading}>
                {block.text}
              </h2>
            );
          }

          if (block.type === "quote") {
            return (
              <Quote key={index} className={styles.quoteSpacing}>
                {renderInlineMarkup(block.text)}
              </Quote>
            );
          }

          return (
            <p key={index} className={styles.bio}>
              {renderInlineMarkup(block.text)}
            </p>
          );
        })}
      </div>
    </main>
  );
}
