import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { buildNetwork, HOP_SECONDS, NeuralNetwork, SIGNAL_CYCLE_SECONDS } from "../decorations/NeuralNetwork";

describe("buildNetwork", () => {
  it("links every node to every node of the next layer", () => {
    const { nodes, edges } = buildNetwork([2, 3, 1]);
    expect(nodes.map((column) => column.length)).toEqual([2, 3, 1]);
    expect(edges).toHaveLength(2 * 3 + 3 * 1);
    expect(edges.every(({ from, to }) => to.layer === from.layer + 1)).toBe(true);
  });

  it("spaces the layers left to right and centers each column vertically", () => {
    const { nodes } = buildNetwork([1, 3]);
    expect(nodes[0][0].x).toBeLessThan(nodes[1][0].x);
    expect(nodes[1][1].y).toBe(50);
    expect(nodes[1][0].y + nodes[1][2].y).toBe(100);
  });
});

describe("NeuralNetwork", () => {
  it("keeps one hop at 12% of the cycle, matching the neural-signal keyframe in globals.css", () => {
    expect(HOP_SECONDS / SIGNAL_CYCLE_SECONDS).toBeCloseTo(0.12, 2);
  });

  it("draws a signal line per route hop on top of the edges", () => {
    const { container } = render(<NeuralNetwork />);
    expect(container.querySelectorAll('line[pathLength="100"]').length).toBeGreaterThan(0);
    expect(container.querySelectorAll("circle")).toHaveLength(3 + 4 + 4 + 2);
  });
});
