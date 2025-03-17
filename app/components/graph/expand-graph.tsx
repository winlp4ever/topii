import { applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Edge, OnEdgesChange, OnNodesChange, ReactFlow } from "@xyflow/react";
import { createStruct } from "./use-struct";
import { useCallback, useEffect, useState } from "react";
import useExpandCollapse from "./layout/use-expandable";
import { ExpandableNode, GraphData } from "@/app/types/graph";
import DashedEdge from "./nodes/dashed-edge";
import GraphNode from "./nodes/graph-node";
import '@xyflow/react/dist/style.css';


const nodeTypes = {
  default: GraphNode,
};

const edgeTypes = {
  dashed: DashedEdge,
};

const defaultEdgeOptions = { style: { stroke: '#ff66aa', strokeWidth: 1 }, type: 'dashed' };

export interface AutoExpandProps {
  treeWidth?: number;
  treeHeight?: number;
  animationDuration?: number;
  data: GraphData
}

export function AutoExpandGraph({
  treeWidth = 400,
  treeHeight = 20,
  data
}: AutoExpandProps) {
  const [nodes, setNodes] = useState<ExpandableNode[]>([] as ExpandableNode[]);
  const [edges, setEdges] = useState<Edge[]>([] as Edge[]);

  useEffect(() => {
    if (data) {
      const { nodes, edges } = createStruct(data);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [data]);

  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(
    nodes,
    edges,
    { treeWidth, treeHeight }
  );

  const onNodesChange: OnNodesChange<ExpandableNode> = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );


  return (
    <div style={{ height: '100vh', width: '100vw' }} className='bg-stone-100' >
      <ReactFlow
        fitView
        nodes={visibleNodes}
        edges={visibleEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesDraggable={true}
        nodesConnectable={false}
        zoomOnDoubleClick={false}
        elementsSelectable={false}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background color='#71717a' variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}