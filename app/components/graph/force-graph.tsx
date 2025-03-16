'use client';
import { useEffect } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  NodeOrigin,
  BackgroundVariant,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


import useForceLayout from './layout/useForceLayout';

import { GraphData } from '../../types/graph';
import DashedEdge from './nodes/dashed-edge';
import { createStruct } from './use-struct';

type GraphProps = {
  strength?: number;
  distance?: number;
  data: GraphData;
  onNodeRightClick?: (nodeId: string) => void;
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];

const edgeTypes = {
  dashed: DashedEdge,
};

const defaultEdgeOptions = { style: { stroke: 'var(--tw-color-pink-500)', strokeWidth: 1 }, type: 'dashed' };

const initialNodes: Node[] = []

const initialEdges: Edge[] = []

function ForceGraph({ strength = -1000, distance = 1000, data, onNodeRightClick }: GraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when data changes
  useEffect(() => {
    if (data) {
      const { nodes, edges } = createStruct(data);

      setNodes(nodes);
      setEdges(edges);
    }
  }, [data, setNodes, setEdges, onNodeRightClick]);

  useForceLayout({ strength, distance });

  return (
    <div style={{ height: '100vh', width: '100vw' }} className='bg-stone-100'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeOrigin={nodeOrigin}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Background color='#71717a' variant={ BackgroundVariant.Dots } />
      </ReactFlow>
    </div>
  );
}

export default ForceGraph;