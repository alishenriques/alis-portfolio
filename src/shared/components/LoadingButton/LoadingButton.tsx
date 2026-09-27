"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { styles } from "./styles/index.styles";

export type LoadingButtonProps = ComponentPropsWithoutRef<"button"> & {
  /**
   * Shows the loading treatment instead of `children`, and disables the
   * button while true.
   */
  isLoading: boolean;
  /**
   * The word shown after "$" while loading (e.g. "enviando"). Not translated
   * by this component — pass an already-translated string, so every caller
   * can customise it for its own action instead of a hardcoded label.
   */
  loadingText: string;
  children: ReactNode;
};

/**
 * A button with a built-in, terminal-styled loading state — for actions that
 * take a moment (the contact form's submit button is the first user), as an
 * alternative to the full-screen `HttpActivityOverlay` for requests that
 * already have a natural, local place to show feedback. While `isLoading`,
 * the button goes dark with an accent border and its label becomes
 * "$ {loadingText}" with a blinking block cursor — the same cursor treatment
 * as the header's DesktopNav — instead of blurring the whole screen.
 *
 * Idle appearance (colour, padding, icon) is entirely up to the consumer's
 * `className`/`children`; this component only overlays the loading look on
 * top, and only while `isLoading` is true, so it works for any button.
 */
export function LoadingButton({
  isLoading,
  loadingText,
  children,
  className,
  disabled,
  type = "button",
  ...props
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      className={cn(className, isLoading && styles.loading)}
      disabled={Boolean(disabled) || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <span className={styles.loadingLabel}>
          <span aria-hidden="true">$</span>
          {loadingText}
          <span aria-hidden="true" className={styles.cursor} />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
