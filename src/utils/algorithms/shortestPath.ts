import { Graph } from '../graph';

export function shortestPath(graph: Graph, start: string, end: string): { path: string[]; distance: number } | null {
  const adjacencyList = graph.getAdjacencyList();

  if (!(start in adjacencyList) || !(end in adjacencyList)) {
    return null;
  }

  const queue: { node: string; path: string[] }[] = [{ node: start, path: [start] }];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;

    if (node === end) {
      return { path, distance: path.length - 1 };
    }

    visited.add(node);

    for (const neighbor of adjacencyList[node]) {
      if (!visited.has(neighbor)) {
        queue.push({ node: neighbor, path: [...path, neighbor] });
      }
    }
  }

  return null;
}
