import { SiGithub } from "@icons-pack/react-simple-icons";
import { useTranslations } from "next-intl";

import { LinkedinIcon } from "./LinkedinIcon";
import { styles } from "./styles/index.styles";
import { socialLinks } from "../../constants/socialLinks";

const icons = {
  github: SiGithub,
  linkedin: LinkedinIcon,
};

/** Site-wide footer, rendered by Layout under every page. */
export function Footer() {
  const t = useTranslations("FOOTER");

  return (
    <footer className={styles.root} aria-label={t("LABEL")}>
      <p className={styles.copy}>© Alisson Henriques</p>

      <ul className={styles.list}>
        {socialLinks.map((link) => {
          const Icon = icons[link.id];
          return (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={t(link.labelKey)}
              >
                <Icon size={20} className={styles.icon} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
