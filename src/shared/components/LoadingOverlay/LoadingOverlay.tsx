import { useTranslations } from "next-intl";

import { Logo } from "@/shared/components/Logo";

import { styles } from "./styles/index.styles";

/**
 * Full-screen "something is loading" overlay: a blurred backdrop with the logo
 * breathing (scale + opacity pulse) inside a spinning dashed ring, and a
 * terminal-style caption below it (`$ carregando`, with a blinking cursor —
 * the same cursor treatment as the header's DesktopNav) so the loading state
 * reads as part of this site's "engineering console" language instead of a
 * generic spinner.
 *
 * Rendered two ways: unconditionally by `app/[locale]/loading.tsx` while a
 * route's data streams in, and conditionally by `HttpActivityOverlay` while a
 * client-side request (e.g. the contact form) is in flight. No hooks of its
 * own beyond translations, so it works as a Server Component in the former.
 */
export function LoadingOverlay() {
  const t = useTranslations("COMMON");

  return (
    <div className={styles.root} role="status">
      <div className={styles.stage} aria-hidden="true">
        <span className={styles.ring} />
        <Logo withWordmark={false} className={styles.logo} />
      </div>
      <p className={styles.caption}>
        <span aria-hidden="true">$</span>
        {t("LOADING")}
        <span aria-hidden="true" className={styles.cursor} />
      </p>
    </div>
  );
}
