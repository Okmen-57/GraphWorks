import React from "react";
import GraphEditor from "./components/GraphEditor";
import { Graph } from "./utils/graph";

const App: React.FC = () => {
  const graph = new Graph();


  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>GraphWorks</h1>
      <GraphEditor graph={graph} />
    </div>
  );
};

export default App;
