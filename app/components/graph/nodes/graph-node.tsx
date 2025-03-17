"use client";
import { ColorMode } from "@/app/types/color-mode";
import { ExpandableNode, NodeData, NodeType } from "../../../types/graph";
import EntityCard, { TypeTabnameMapping } from "../../entity/card";
import { NodeTypeColorMapping } from "../../entity/color-mapping";
import React, { useCallback } from "react";
import { Handle, NodeProps, Position, useNodes, useReactFlow } from "@xyflow/react";
import { ChevronDown } from "lucide-react";


export interface StructNodeProps {
  structNode: NodeData;
  onClick: () => void;
}


export const StructNode: React.FC<StructNodeProps> = ({ structNode, onClick }) => {
  return (
    <div className='border-none px-2 py-1 bg-stone-100 rounded-full'>
      <button
        className={'text-lg border-none flex flex-row space-x-1 items-center font-semibold' + (structNode.expanded ? ' text-stone-700' : ' text-stone-400')}
        onClick={onClick}
      >
        <span>{structNode.struct ? TypeTabnameMapping[structNode.struct.type] : 'Struct'}</span>
        <ChevronDown
          strokeWidth={1.5}
          className={'w-4 h-4 transition-all duration-200 ease-in-out' + (structNode.expanded ? ' transform -rotate-90' : '')}
        />
      </button>
    </div>
  );
}

// Define the GraphNode component as an arrow function with typed props
export default function GraphNode({ data }: NodeProps<ExpandableNode>) {
  const nodes = useNodes<ExpandableNode>();
  const { setNodes } = useReactFlow();

  const cardDivRef = React.useRef<HTMLDivElement>(null);

  const onExpand = useCallback(() => {
    setNodes((nds) => {
      const nodeMap = new Map<string, ExpandableNode>();
      nodes.forEach((node) => nodeMap.set(node.id, node));
      if (!data.expanded) {
        // node is already collapsed, just toggle it
        return nds.map((n) =>
          n.id === data.id ? { ...n, data: { ...n.data, expanded: true } } : n
        );
      }

      // node is being collapsed -> perform BFS to collapse all connected nodes
      const queue = [data.id];
      const visited = new Set(queue);

      while (queue.length > 0) {
        const currentId = queue.shift();

        if (!currentId) continue;
        const currentNode = nodeMap.get(currentId);
        // add adjacent nodes to the queue
        if (!currentNode?.data.adjacentNodeIds) continue;
        for (const adjId of currentNode.data.adjacentNodeIds) {
          if (!visited.has(adjId)) {
            visited.add(adjId);
            queue.push(adjId);
          }
        }
      }

      // update nodes by setting expanded=false for all visited nodes
      return nds.map((n) =>
        visited.has(n.id) ? { ...n, data: { ...n.data, expanded: false } } : n
      );
    });
  }, [data, nodes, setNodes]);

  return (
    <div className="relative flex items-center bg-transparent">
      <Handle position={Position.Left} type="target" />
      <Handle position={Position.Right} type="source" />
      {
        data.type === NodeType.Struct ? (
          <StructNode structNode={data} onClick={onExpand} />
        ) : (
          <>
            <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0" />
            <EntityCard
              ref={cardDivRef}
              displayMode={data.expanded ? 'medium' : 'mini'}
              node={data}
              className='absolute -left-2 top-0 [&>button]:shadow-lg'
              colorMode={NodeTypeColorMapping[data.type as NodeType] as ColorMode}
              toggleCard={onExpand}
            />
          </>
        )
      }
    </div>
  );
};
