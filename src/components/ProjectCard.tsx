import type { Project } from "@/lib/schemas";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-transform hover:-translate-y-1">
      <h3 className="text-xl font-semibold text-zinc-50">{project.title}</h3>
      <p className="mt-2 text-zinc-400">{project.summary}</p>
      {project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
