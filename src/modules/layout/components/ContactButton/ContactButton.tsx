"use client";

import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

import { useContactDialog } from "../../ContactDialogContext";
import { styles } from "./styles/index.styles";

/** Header shortcut to the contact dialog, desktop only (tablet/mobile get it inside the drawer). */
export function ContactButton() {
  const t = useTranslations("CONTACT");
  const { open } = useContactDialog();

  return (
    <button type="button" className={styles.root} onClick={open}>
      <Send size={14} aria-hidden="true" />
      {t("OPEN")}
    </button>
  );
}
