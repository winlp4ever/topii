"use client";
import { ColorMode } from "@/app/types/color-mode";
import { ExpandableNode, NodeData, NodeType } from "../../../types/graph";
import { TypeTabnameMapping } from "../../entity/card";
import { NodeTypeColorMapping, NodeTypeIconMapping } from "../../entity/color-mapping";
import React, { useEffect } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ChevronDown } from "lucide-react";
import NodeView from "../../entity/node-view";


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

  return (
    <div className="relative flex items-center bg-transparent">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      <Handle
        position={Position.Right}
        type="source"
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />

      {
        <>
          <NodeView
            node={data}
            colorMode={NodeTypeColorMapping[data.type] as ColorMode}
          />
        </>
      }
    </div>
  );
};
