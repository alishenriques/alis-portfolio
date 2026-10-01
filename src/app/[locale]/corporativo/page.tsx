import { getPageMetadata, type LocaleParams } from "@/lib/pageMetadata";
import { Experience } from "@/modules/experience";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return getPageMetadata(params, "CORPORATE");
}

export default function Page() {
  return <Experience />;
}
