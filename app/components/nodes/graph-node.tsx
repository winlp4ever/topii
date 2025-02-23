"use client";
import { ColorMode } from "@/app/types/color-mode";
import { Node_, NodeType } from "../../types/graph";
import EntityCard from "../entity/card";


type GraphNodeProps = {
  node: Node_;
  isRoot?: boolean;
};

// Define the GraphNode component as an arrow function with typed props
const GraphNode: React.FC<GraphNodeProps> = ({ node, isRoot = false }) => {
  let colorMode: ColorMode = 'slate';
  switch (node.type) {
    case NodeType.Corpus:
      colorMode = 'blue';
      break;
    case NodeType.Answer:
      colorMode = 'emerald';
      break;
    case NodeType.QA:
      colorMode = 'green';
      break;
    case NodeType.Block:
      colorMode = 'yellow';
      break;
    case NodeType.Concept:
      colorMode = 'slate';
      break;
    case NodeType.Document:
      colorMode = 'pink';
      break;
    case NodeType.Exercise:
      colorMode = 'amber';
      break;
    case NodeType.ROMECompetency:
      colorMode = 'orange';
      break;
    case NodeType.RNCPCompetency:
      colorMode = 'emerald';
      break;
  }

  return (
    <div className="relative flex items-center bg-transparent">
      <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
      <EntityCard
        displayMode='mini'
        node={node}
        className='absolute -left-2 top-0'
        colorMode={colorMode}
        isRoot={isRoot}
      />
    </div>
  );
};

export default GraphNode;
