"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type ContactDialogContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContactDialogContext = createContext<ContactDialogContextValue | null>(null);

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return <ContactDialogContext.Provider value={value}>{children}</ContactDialogContext.Provider>;
}

/** Lets any component (e.g. the sidebar's "Contact" item, a CTA button) open the contact dialog. */
export function useContactDialog() {
  const context = useContext(ContactDialogContext);
  if (!context) {
    throw new Error("useContactDialog must be used within a ContactDialogProvider");
  }
  return context;
}
