import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VideoEmbed } from "../VideoEmbed";

describe("VideoEmbed", () => {
  it("shows the coming-soon placeholder when no youtubeId is given", () => {
    render(<VideoEmbed title="Vídeo de apresentação" comingSoonText="Vídeo em breve" />);

    expect(screen.getByText("Vídeo em breve")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Vídeo de apresentação" })).toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("embeds the real YouTube player once a youtubeId is given", () => {
    render(
      <VideoEmbed youtubeId="dQw4w9WgXcQ" title="Vídeo de apresentação" comingSoonText="Vídeo em breve" />,
    );

    const iframe = document.querySelector("iframe");
    expect(iframe).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
    expect(iframe).toHaveAttribute("title", "Vídeo de apresentação");
    expect(screen.queryByText("Vídeo em breve")).not.toBeInTheDocument();
  });
});
