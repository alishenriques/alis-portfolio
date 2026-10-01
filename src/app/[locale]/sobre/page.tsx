import { getPageMetadata, type LocaleParams } from "@/lib/pageMetadata";
import { About } from "@/modules/about";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return getPageMetadata(params, "ABOUT");
}

export default function Page() {
  return <About />;
}
