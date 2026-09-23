import { Eyebrow } from "@alishenriques/design-system";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { getProfile } from "@/lib/portfolio";

import { styles } from "./styles/index.styles";

export async function About() {
  const [profile, t] = await Promise.all([getProfile(), getTranslations("ABOUT")]);

  return (
    <main className={styles.root}>
      <div className={styles.header}>
        {profile.avatarUrl && (
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={160}
            height={160}
            className={styles.avatar}
          />
        )}
        <div>
          <Eyebrow>{t("TITLE")}</Eyebrow>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.headline}>{profile.headline}</p>
        </div>
      </div>

      <p className={styles.bio}>{profile.bio}</p>
    </main>
  );
}
