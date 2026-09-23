import { ExternalLinkButton } from "@/components/ExternalLinkButton";
import { ProjectCard } from "@/components/ProjectCard";
import { getProfile, getProjects } from "@/lib/portfolio";

// CMS content changes independently of deploys and is fetched with Axios
// (not Next's `fetch`), so Next can't detect it's dynamic on its own.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-24">
      <header className="flex flex-col gap-6">
        <p className="text-sm font-medium uppercase tracking-widest text-lime-400">
          {profile.headline}
        </p>
        <h1 className="text-4xl font-semibold text-zinc-50 sm:text-5xl">{profile.name}</h1>
        <p className="max-w-xl text-lg leading-relaxed text-zinc-400">{profile.bio}</p>
        <div>
          <ExternalLinkButton href="mailto:alishenriques@gmail.com">
            Let&apos;s talk
          </ExternalLinkButton>
        </div>
      </header>

      <section aria-labelledby="projects-heading" className="flex flex-col gap-6">
        <h2 id="projects-heading" className="text-2xl font-semibold text-zinc-50">
          Projects
        </h2>
        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-500">No published projects yet.</p>
        )}
      </section>
    </main>
  );
}
