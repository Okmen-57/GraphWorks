import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

interface GraphVisualizerProps {
  elements: any[];
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ elements }) => {
  return (
    <CytoscapeComponent
    elements={elements}
    style={{ width: "100%", height: "100%" }}
    layout={{
      name: "preset",
    }}
    stylesheet={[
      {
        selector: "node",
        style: {
          label: "data(id)",
          "background-color": "#0074D9",
          color: "#FFFFFF",
          "text-valign": "center",
          "text-halign": "center",
          "font-size": "12px",
          "text-outline-width": 2,
          "text-outline-color": "#0074D9",
        },
      },
      {
        selector: "edge",
        style: {
          "line-color": "#AAAAAA",
          width: 3,
        },
      },
    ]}
  />
  );
};

export default GraphVisualizer;
