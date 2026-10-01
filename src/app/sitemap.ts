import { loadPublicEnv } from "@/lib/env";
import { buildSitemap } from "@/lib/seo";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(loadPublicEnv().NEXT_PUBLIC_SITE_URL);
}
