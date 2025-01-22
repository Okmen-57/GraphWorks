import { Graph } from '../graph';

export function isEulerian(graph: Graph): { type: 'Circuit' | 'Path' | 'None'; explanation: string } {
  const adjacencyList = graph.getAdjacencyList();
  let oddDegCount = 0;

  const zeroDegNodes = Object.keys(adjacencyList).filter(
    (node) => adjacencyList[node].size === 0
  );

  const nonZeroDegNodes = Object.keys(adjacencyList).filter(
    (node) => adjacencyList[node].size > 0
  );

  if (nonZeroDegNodes.length === 0) {
    return { type: 'None', explanation: 'The graph has no edges and is not Eulerian.' };
  }

  const visited = new Set<string>();
  const dfs = (node: string) => {
    visited.add(node);
    for (const neighbor of adjacencyList[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  };

  dfs(nonZeroDegNodes[0]);

  if (zeroDegNodes.length > 0 || nonZeroDegNodes.some((node) => !visited.has(node))) {
    return { type: 'None', explanation: 'The graph is disconnected, so it is not Eulerian.' };
  }

  for (const node in adjacencyList) {
    if (adjacencyList[node].size % 2 !== 0) {
      oddDegCount++;
    }
  }

  if (oddDegCount === 0) {
    return {
      type: 'Circuit',
      explanation: 'Graph is connected and all vertices have even degrees, graph has an Eulerian path.',
    };
  } else if (oddDegCount === 2) {
    return {
      type: 'Path',
      explanation: 'Graph is connected and exactly two vertices have odd degrees, graph has an Eulerian path.',
    };
  } else {
    return {
      type: 'None',
      explanation: 'More than two vertices have odd degrees. The graph is not Eulerian.',
    };
  }
}
