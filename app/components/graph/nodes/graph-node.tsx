"use client";
import { ColorMode } from "@/app/types/color-mode";
import { ExpandableNode, NodeType } from "../../../types/graph";
import { NodeTypeColorMapping } from "../../entity/color-mapping";
import React, { useEffect } from "react";
import { Handle, NodeProps, NodeResizer, Position, useReactFlow } from "@xyflow/react";
import NodeView from "../../entity/node-view";


// Define the GraphNode component as an arrow function with typed props
export default function GraphNode({ data, selected }: NodeProps<ExpandableNode>) {
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
    <>
      <NodeResizer minWidth={100} minHeight={30} isVisible={selected === true} />
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
      <NodeView
        node={data}
        colorMode={NodeTypeColorMapping[data.type] as ColorMode}
        className='font-handwriting'
      />
    </>
  );
};
