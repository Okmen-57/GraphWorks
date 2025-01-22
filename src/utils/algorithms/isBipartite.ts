import { Graph } from '../graph';

export function isBipartite(graph: Graph): boolean {
  const adjacencyList = graph.getAdjacencyList();
  const color: Record<string, number> = {};

  for (const node in adjacencyList) {
    if (!(node in color)) {
      color[node] = 0;
      const que = [node];

      while (que.length > 0) {
        const curr = que.shift()!;
        for (const neighbor of adjacencyList[curr]) {
          if (!(neighbor in color)) {
            color[neighbor] = 1 - color[curr];
            que.push(neighbor);
          } else if (color[neighbor] === color[curr]) {
            return false;
          }
        }
      }
    }
  }

  return true;
}
