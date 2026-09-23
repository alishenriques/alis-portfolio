"use client";

import type { ReactNode } from "react";

import { ContactDialog } from "./components/ContactDialog";
import { TopBar } from "./components/TopBar";
import { ContactDialogProvider } from "./ContactDialogContext";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <ContactDialogProvider>
      <TopBar />
      {children}
      <ContactDialog />
    </ContactDialogProvider>
  );
}
