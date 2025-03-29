"use client";
import { ColorMode } from "@/app/types/color-mode";
import { ExpandableNode, NodeData, NodeType } from "../../../types/graph";
import EntityCard, { TypeTabnameMapping } from "../../entity/card";
import { NodeTypeColorMapping, NodeTypeIconMapping } from "../../entity/color-mapping";
import React, { useCallback, useEffect } from "react";
import { Handle, NodeProps, Position, useNodes, useReactFlow } from "@xyflow/react";
import { ChevronDown } from "lucide-react";


export interface StructNodeProps {
  structNode: NodeData;
  onClick: () => void;
}


export const StructNode: React.FC<StructNodeProps> = ({ structNode, onClick }) => {
  const icon = structNode.struct?.type ? NodeTypeIconMapping[structNode.struct.type]: NodeTypeIconMapping[NodeType.Struct];
  return (
    <div className='min-w-60 flex flex-row items-center justify-center'>
      <button
        className={'text-lg border-none flex flex-row space-x-2 items-center font-semibold' + (structNode.expanded ? ' text-stone-900' : ' text-stone-400')}
        onClick={onClick}
      >
        {React.createElement(icon)}
        <span className='whitespace-nowrap'>{structNode.struct ? TypeTabnameMapping[structNode.struct.type].toUpperCase() : 'STRUCT'}</span>
        <ChevronDown
          strokeWidth={1.75}
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

  useEffect(() => {
    if (cardDivRef.current) {
      if (data.type === NodeType.Struct) return;
      if (data.expanded && !data.setHeight) {
        const height = cardDivRef.current.offsetHeight + 120;
        setNodes((nds) => {
          return nds.map((n) => n.id === data.id ? { ...n, data: { ...n.data, height: height, setHeight: true } } : n);
        });
      }
      if (!data.expanded && data.setHeight) {
        setNodes((nds) => {
          return nds.map((n) => n.id === data.id ? { ...n, data: { ...n.data, height: 0, setHeight: false } } : n);
        });
      }
    }
  }, [data, setNodes]);

  const toggleExpand = useCallback(() => {
    setNodes((nds) => {
      const nodeMap = new Map<string, ExpandableNode>();
      nodes.forEach((node) => nodeMap.set(node.id, node));
      if (!data.expanded) {
        // node is collapsed, just toggle it
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
      <Handle
        type="target"
        position={Position.Left}
        className="!absolute !top-0 !left-0 !-translate-y-1/2 w-3 h-3 bg-blue-500 border-2 border-white"
      />
      <Handle
        position={Position.Right}
        type="source"
        className="!absolute !top-0 !right-0 !-translate-y-1/2 w-3 h-3 bg-blue-500 border-2 border-white"
      />
      
      {
        <>
          <div className="left-0 w-80 h-8 bg-transparent rounded-full z-0" />
          {
            data.type === NodeType.Struct ? (
              <div className='absolute -left-2 top-0 -translate-y-1/2 w-auto border-none p-1 bg-white rounded-full'>
                <StructNode structNode={data} onClick={toggleExpand} />
              </div>
            ) : <EntityCard
              ref={cardDivRef}
              displayMode={data.expanded ? 'medium' : 'mini'}
              node={data}
              className='absolute -left-2 top-0 -translate-y-1/2 [&>button]:shadow-lg'
              colorMode={NodeTypeColorMapping[data.type as NodeType] as ColorMode}
              toggleCard={toggleExpand}
            >

            </EntityCard>
          }
        </>
      }
    </div>
  );
};
