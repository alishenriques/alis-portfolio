import { getPageMetadata, type LocaleParams } from "@/lib/pageMetadata";
import { Home } from "@/modules/home";

import type { Metadata } from "next";

// CMS content changes independently of deploys and is fetched with Axios
// (not Next's `fetch`), so Next can't detect it's dynamic on its own.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return getPageMetadata(params, "HOME");
}

export default function Page() {
  return <Home />;
}
