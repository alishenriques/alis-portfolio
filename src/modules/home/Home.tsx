import { getTranslations } from "next-intl/server";

import { getProjects } from "@/lib/portfolio";
import { ProjectCard } from "@/shared/components/ProjectCard";

import { Skills } from "../skills";
import { FeatureChips } from "./components/FeatureChips";
import { Hero } from "./components/Hero";

export async function Home() {
  const [projects, t] = await Promise.all([getProjects(), getTranslations("PROJECTS")]);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <FeatureChips />
      </div>

      <Skills />

      <section
        id="projetos"
        aria-labelledby="projetos-heading"
        className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-24 sm:px-6"
      >
        <h2
          id="projetos-heading"
          className="font-mono text-xs tracking-[0.2em] text-[var(--ds-color-muted)] uppercase"
        >
          {t("TITLE")}
        </h2>
        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-[var(--ds-color-muted)]">{t("EMPTY")}</p>
        )}
      </section>
    </main>
  );
}
