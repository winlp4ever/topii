"use client";
import { ColorMode } from "@/app/types/color-mode";
import { Node_, NodeType } from "../../../types/graph";
import EntityCard from "../../entity/card";
import { NodeTypeColorMapping } from "../../entity/color-mapping";
import React from "react";


type GraphNodeProps = {
  node: Node_;
  isRoot?: boolean;
};


export const StructNode: React.FC<{ structNode: Node_ }> = ({ structNode }) => {
  return (
    <div className='border-none'>
      <button className=''>
        {structNode.struct ? structNode.struct.type : 'Struct'}
      </button>
    </div>
  );
}

// Define the GraphNode component as an arrow function with typed props
const GraphNode: React.FC<GraphNodeProps> = ({ node, isRoot = false }) => {
  return (
    <div className="relative flex items-center bg-transparent">
      <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0" />
      <EntityCard
        displayMode={isRoot ? "medium" : "mini"}
        node={node}
        className='absolute -left-2 top-0 [&>button]:shadow-lg'
        colorMode={NodeTypeColorMapping[node.type as NodeType] as ColorMode}
        isRoot={isRoot}
      />
    </div>
  );
};

export default GraphNode;
