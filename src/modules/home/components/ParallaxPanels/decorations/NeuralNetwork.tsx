import { styles } from "../styles/index.styles";

/** Nodes per layer, input to output. */
const LAYERS = [3, 4, 4, 2];
/** Paths a signal takes through the network: one node index per layer. */
const SIGNAL_ROUTES = [
  [0, 1, 2, 0],
  [2, 3, 1, 1],
  [1, 0, 3, 0],
];
/** Seconds a signal takes to cross one layer; the next edge of its route starts right after. */
export const HOP_SECONDS = 0.9;
/** Seconds between one route's start and the next. */
const ROUTE_STAGGER_SECONDS = 1.3;

const VIEW_WIDTH = 200;
const VIEW_HEIGHT = 100;
const PADDING = 14;

export type NetworkNode = { layer: number; index: number; x: number; y: number };
export type NetworkEdge = { from: NetworkNode; to: NetworkNode };

/** Lays the nodes out in evenly spaced columns and links every node to all nodes of the next layer. */
export function buildNetwork(layers: readonly number[]) {
  const columnGap = (VIEW_WIDTH - PADDING * 2) / Math.max(layers.length - 1, 1);
  const nodes = layers.map((count, layer) =>
    Array.from({ length: count }, (_, index): NetworkNode => ({
      layer,
      index,
      x: PADDING + layer * columnGap,
      y: (VIEW_HEIGHT / (count + 1)) * (index + 1),
    })),
  );
  const edges: NetworkEdge[] = nodes
    .slice(0, -1)
    .flatMap((column, layer) => column.flatMap((from) => nodes[layer + 1].map((to) => ({ from, to }))));
  return { nodes, edges };
}

const NETWORK = buildNetwork(LAYERS);

// Every hop of every route, with the delay that makes it start as the
// previous hop of the same route arrives.
const SIGNALS = SIGNAL_ROUTES.flatMap((route, routeIndex) =>
  route.slice(0, -1).map((nodeIndex, layer) => ({
    from: NETWORK.nodes[layer][nodeIndex],
    to: NETWORK.nodes[layer + 1][route[layer + 1]],
    delay: routeIndex * ROUTE_STAGGER_SECONDS + layer * HOP_SECONDS,
  })),
);
export const SIGNAL_CYCLE_SECONDS = SIGNAL_ROUTES.length * ROUTE_STAGGER_SECONDS + LAYERS.length * HOP_SECONDS;

/**
 * A small feed-forward network with "signals" (short dashes) hopping along a
 * few routes, layer by layer. Minimal on purpose: thin edges, dots, one accent.
 */
export function NeuralNetwork() {
  return (
    <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className={styles.chart}>
      {NETWORK.edges.map(({ from, to }) => (
        <line
          key={`${from.layer}-${from.index}-${to.index}`}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          className={styles.networkEdge}
        />
      ))}
      {SIGNALS.map(({ from, to, delay }) => (
        <line
          key={`${from.layer}-${from.index}-${to.index}-${delay}`}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          pathLength={100}
          className={styles.networkSignal}
          style={{ animationDelay: `${delay}s`, animationDuration: `${SIGNAL_CYCLE_SECONDS}s` }}
        />
      ))}
      {NETWORK.nodes.flat().map((node) => (
        <circle
          key={`${node.layer}-${node.index}`}
          cx={node.x}
          cy={node.y}
          r={4}
          className={node.layer === LAYERS.length - 1 ? styles.networkNodeOutput : styles.networkNode}
        />
      ))}
    </svg>
  );
}
