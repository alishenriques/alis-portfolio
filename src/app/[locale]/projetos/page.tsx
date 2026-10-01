import { getPageMetadata, type LocaleParams } from "@/lib/pageMetadata";
import { Projects } from "@/modules/projects";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return getPageMetadata(params, "PROJECTS");
}

type PageProps = {
  searchParams: Promise<{ project?: string | string[] }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { project } = await searchParams;
  const initialSelectedSlug = typeof project === "string" ? project : null;

  return <Projects initialSelectedSlug={initialSelectedSlug} />;
}
