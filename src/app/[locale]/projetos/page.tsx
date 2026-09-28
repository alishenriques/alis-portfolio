import { Projects } from "@/modules/projects";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ project?: string | string[] }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { project } = await searchParams;
  const initialSelectedSlug = typeof project === "string" ? project : null;

  return <Projects initialSelectedSlug={initialSelectedSlug} />;
}
