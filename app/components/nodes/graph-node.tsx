"use client";
import { ColorMode } from "@/app/types/color-mode";
import { Node_, NodeType } from "../../types/graph";
import EntityCard from "../entity/card";
import { NodeTypeColorMapping } from "../entity/color-mapping";


type GraphNodeProps = {
  node: Node_;
  isRoot?: boolean;
};

// Define the GraphNode component as an arrow function with typed props
const GraphNode: React.FC<GraphNodeProps> = ({ node, isRoot = false }) => {
  return (
    <div className="relative flex items-center bg-transparent">
      <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
      <EntityCard
        displayMode={isRoot ? "medium" : "mini"}
        node={node}
        className='absolute -left-2 top-0'
        colorMode={NodeTypeColorMapping[node.type as NodeType] as ColorMode}
        isRoot={isRoot}
      />
    </div>
  );
};

export default GraphNode;
