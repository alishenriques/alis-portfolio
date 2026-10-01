import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OgCard } from "../OgCard";

describe("OgCard", () => {
  it("renders the name, role, page path, headline and description", () => {
    render(
      <OgCard headline="Projetos" description="Do primeiro commit ao ar" role="Desenvolvedor Front-End" path="/pt/projetos" />,
    );

    expect(screen.getByText("Alisson Henriques")).toBeInTheDocument();
    expect(screen.getByText("Desenvolvedor Front-End")).toBeInTheDocument();
    expect(screen.getByText("/pt/projetos")).toBeInTheDocument();
    expect(screen.getByText("Projetos")).toBeInTheDocument();
    expect(screen.getByText("Do primeiro commit ao ar")).toBeInTheDocument();
  });
});
