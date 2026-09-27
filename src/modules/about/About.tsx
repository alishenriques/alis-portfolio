import { Avatar, Eyebrow, Quote } from "@alishenriques/design-system";
import { getTranslations } from "next-intl/server";

import { getProfile } from "@/lib/portfolio";
import { parseBio, renderInlineMarkup } from "@/lib/richText";
import { VideoEmbed } from "@/shared/components/VideoEmbed";

import { styles } from "./styles/index.styles";

export async function About() {
  const [profile, t] = await Promise.all([getProfile(), getTranslations("ABOUT")]);

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

      <div className={styles.bioSection}>
        {parseBio(profile.bio).map((block, index) =>
          block.type === "quote" ? (
            <Quote key={index}>{renderInlineMarkup(block.text)}</Quote>
          ) : (
            <p key={index} className={styles.bio}>
              {renderInlineMarkup(block.text)}
            </p>
          ),
        )}
      </div>
    </main>
  );
}
