import React, { useState } from "react";
import { Graph } from "../utils/graph";
import GraphVisualizer from "./GraphVisualizer";
import "../styles/GraphEditor.css";

interface GraphEditorProps {
  graph: Graph;
}

const GraphEditor: React.FC<GraphEditorProps> = ({ graph }) => {
  const [notation, setNotation] = useState("a b\nb c\n");
  const [elements, setElements] = useState<any[]>([]);
  const [bipartiteStatus, setBipartiteStatus] = useState<string>("Unknown");
  const [eulerianStatus, setEulerianStatus] = useState<string>("Unknown");
  const [shortestPathResult, setShortestPathResult] = useState<string>("Not computed");
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");

  const handleUpdate = () => {
    try {
      const existingPositions: Record<string, { x: number; y: number }> = {};
      elements.forEach((element) => {
        if (element.group === "nodes") {
          existingPositions[element.data.id] = element.position;
        }
      });

      graph.clear();

      const lines = notation.split("\n").map((line) => line.trim());
      for (const line of lines) {
        if (!line) continue;
        const parts = line.split(" ").map((part) => part.trim());
        if (parts.length === 2) {
          graph.addEdge(parts[0], parts[1]);
        } else if (parts.length === 1 && parts[0]) {
          graph.addNode(parts[0]);
        } else {
          console.warn(`Invalid input: "${line}"`);
        }
      }

      const graphElements = graph.getElements();
      const centerX = 300;
      const centerY = 300;
      const radius = 150;
      let angleStep = (2 * Math.PI) / graphElements.nodes.length;
      let index = 0;

      graphElements.nodes.forEach((node) => {
        if (existingPositions[node.data.id]) {
          node.position = existingPositions[node.data.id];
        } else {
          const angle = index * angleStep;
          node.position = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          };
          index += 1;
        }
      });
      
      setElements(graphElements.nodes.concat(graphElements.edges));

      const isBipartite = graph.isBipartite();
      setBipartiteStatus(isBipartite ? "Graph is bipartite" : "Graph is NOT bipartite");

      const eulerian = graph.isEulerian();
      setEulerianStatus(`${eulerian.type}: ${eulerian.explanation}`);
    } catch (error) {
      console.error("Error updating graph:", error);
    }
  };

  const handleShortestPath = () => {
    if (!startNode || !endNode) {
      setShortestPathResult("Please specify both start and end nodes.");
      return;
    }

    const result = graph.shortestPath(startNode, endNode);
    if (result) {
      setShortestPathResult(`Path: ${result.path.join(" -> ")}, Distance: ${result.distance}`);
    } else {
      setShortestPathResult("No path found between the specified nodes.");
    }
  };

  return (
    <div className="graph-editor-container">
      <div className="graph-editor-sidebar">
        <h2 className="graph-editor-title">Graph Editor</h2>
        <textarea
          value={notation}
          onChange={(e) => setNotation(e.target.value)}
          className="graph-editor-textarea"
          placeholder="Enter graph notation, e.g., a b\nb c\n"
        />
        <button onClick={handleUpdate} className="graph-editor-button">
          Update Graph
        </button>
        <p className="graph-editor-status">Bipartite: {bipartiteStatus}</p>
        <p className="graph-editor-status">Eulerian: {eulerianStatus}</p>
        <div className="shortest-path-section">
          <h3>Shortest Path</h3>
          <input
            type="text"
            placeholder="Start node"
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            className="shortest-path-input"
          />
          <input
            type="text"
            placeholder="End node"
            value={endNode}
            onChange={(e) => setEndNode(e.target.value)}
            className="shortest-path-input"
          />
          <button onClick={handleShortestPath} className="graph-editor-button">
            Find Shortest Path
          </button>
          <p className="graph-editor-status">{shortestPathResult}</p>
        </div>
      </div>
      <div className="graph-editor-visualizer">
        <GraphVisualizer elements={elements} />
      </div>
    </div>
  );
};

export default GraphEditor;
