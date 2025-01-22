import { isBipartite } from './algorithms/isBipartite';
import { isEulerian } from './algorithms/isEulerian';
import { shortestPath } from "./algorithms/shortestPath";

export class Graph {
  private adjacencyList: Record<string, Set<string>>;

  constructor() {
    this.adjacencyList = {};
  }

  addNode(node: string): void {
    if (!node) return; // Ignore empty nodes
    if (!this.adjacencyList[node]) {
      this.adjacencyList[node] = new Set();
    }
  }

  addEdge(node1: string, node2: string): void {
    if (!node1 || !node2) return; // Ignore invalid edges
    if (node1 === node2) return; // Prevent self-loops
    this.addNode(node1);
    this.addNode(node2);
    this.adjacencyList[node1].add(node2);
    this.adjacencyList[node2].add(node1); // For undirected graphs
  }

  clear(): void {
    this.adjacencyList = {};
  }

  getAdjacencyList(): Record<string, Set<string>> {
    return this.adjacencyList;
  }

  // Delegate isBipartite functionality to the external algorithm
  isBipartite(): boolean {
    return isBipartite(this);
  }

  // Delegate isEulerian functionality to the external algorithm
  isEulerian(): { type: 'Circuit' | 'Path' | 'None'; explanation: string } {
    return isEulerian(this);
  }

  shortestPath(start: string, end: string): { path: string[]; distance: number } | null {
    return shortestPath(this, start, end);
  }

  getElements(): { nodes: any[]; edges: any[] } {
    const nodes = Object.keys(this.adjacencyList).map((id) => ({ data: { id } }));
    const edges = [];
    for (const [src, neighbors] of Object.entries(this.adjacencyList)) {
      for (const tgt of neighbors) {
        if (src < tgt) {
          edges.push({ data: { source: src, target: tgt } });
        }
      }
    }
    return { nodes, edges };
  }
}
