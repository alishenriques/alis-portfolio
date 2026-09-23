import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Project } from "@/lib/schemas";

import { ProjectCard } from "../ProjectCard";

const project: Project = {
  id: "1",
  slug: "demo",
  title: "Demo project",
  summary: "A short summary",
  body: "",
  coverUrl: null,
  tags: ["react", "graphql"],
  featured: false,
  publishedAt: null,
};

describe("ProjectCard", () => {
  it("renders the title, summary and tags", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("heading", { name: "Demo project" })).toBeInTheDocument();
    expect(screen.getByText("A short summary")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("graphql")).toBeInTheDocument();
  });

  it("omits the tag list when there are no tags", () => {
    render(<ProjectCard project={{ ...project, tags: [] }} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
