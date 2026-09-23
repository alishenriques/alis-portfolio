"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { sendContactMessage } from "@/lib/portfolio";
import { contactFormSchema } from "@/lib/schemas";

import { styles } from "./styles/index.styles";
import { useContactDialog } from "../../ContactDialogContext";

const CONTACT_EMAIL = "alishenriques@gmail.com";

type Status = "idle" | "sending" | "success" | "error";

export function ContactDialog() {
  const t = useTranslations("CONTACT");
  const { isOpen, close } = useContactDialog();
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Resets the form state on every open, without an effect: React's documented
  // pattern for adjusting state during render (see "Adjusting some state when
  // a prop changes" in react.dev). Runs in the same render pass, no extra
  // commit, and avoids the cascading-render lint rule that a useEffect here
  // would trip.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setStatus("idle");
      setFieldError(null);
    }
  }

  // Focusing the field is a genuine side effect (imperative DOM), unlike the
  // state reset above, so it stays in an effect.
  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => nameRef.current?.focus(), 0);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Captured now, not re-read after the `await` below: React (like the DOM
    // spec) only guarantees `currentTarget` for the synchronous dispatch —
    // it's null by the time an async handler resumes.
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = contactFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"),
    });

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setFieldError(null);
    setStatus("sending");
    try {
      await sendContactMessage(parsed.data);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label={t("TITLE")}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("TITLE")}</h2>
          <button type="button" className={styles.closeButton} onClick={close} aria-label={t("CLOSE")}>
            ×
          </button>
        </div>

        {status === "success" ? (
          <p className={styles.success}>{t("SUCCESS")}</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              ref={nameRef}
              name="name"
              type="text"
              placeholder={t("NAME")}
              className={styles.input}
              required
            />
            <input
              name="email"
              type="email"
              placeholder={t("EMAIL")}
              className={styles.input}
              required
            />
            <textarea
              name="message"
              placeholder={t("MESSAGE")}
              className={styles.textarea}
              rows={4}
              required
            />
            {/* Honeypot: hidden from real visitors, bots fill every field they find. */}
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className={styles.honeypot}
              aria-hidden="true"
            />

            {fieldError && <p className={styles.error}>{fieldError}</p>}
            {status === "error" && (
              <p className={styles.error}>{t("ERROR", { email: CONTACT_EMAIL })}</p>
            )}

            <button type="submit" className={styles.submit} disabled={status === "sending"}>
              {status === "sending" ? t("SENDING") : t("SEND")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
