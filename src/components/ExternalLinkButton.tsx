"use client";

import type { ButtonProps } from "@alishenriques/design-system";
import { Button } from "@alishenriques/design-system";

type ExternalLinkButtonProps = Omit<ButtonProps, "onClick"> & { href: string };

/** Design-system Button that navigates like a link (Button itself has no href prop). */
export function ExternalLinkButton({ href, children, ...props }: ExternalLinkButtonProps) {
  return (
    <Button {...props} onClick={() => window.open(href, "_blank", "noopener,noreferrer")}>
      {children}
    </Button>
  );
}
