import { loadPublicEnv } from "@/lib/env";
import { buildRobots } from "@/lib/seo";

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return buildRobots(loadPublicEnv().NEXT_PUBLIC_SITE_URL);
}
