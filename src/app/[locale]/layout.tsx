import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import "@alishenriques/design-system/styles.css";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { Layout } from "@/modules/layout";

import type { Metadata } from "next";

// Self-hosted via next/font (no external request, no layout shift). globals.css
// re-declares the design system's --ds-font-* tokens to point at these, so the
// design system's own fallback stacks are only what renders if that import order
// ever breaks.
const plexSans = IBM_Plex_Sans({
  weight: "variable",
  variable: "--font-plex-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  weight: "variable",
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alisson Henriques — Portfolio",
  description: "Interactive portfolio of Alisson Henriques.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this request (see next-intl docs on setRequestLocale).
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${plexSans.variable} ${plexMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Layout>{children}</Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
