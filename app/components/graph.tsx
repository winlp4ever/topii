'use client';
import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  NodeOrigin,
  addEdge,
  OnConnect,
  BackgroundVariant,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


import useForceLayout from './layout/useForceLayout';

import { GraphData } from '../types/graph';
import GraphNode from './nodes/graph_node';
import DashedEdge from './nodes/dashed-edge';

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

const defaultEdgeOptions = { style: { stroke: '#ff66aa', strokeWidth: 3 }, type: 'dashed' };

const initialNodes: Node[] = []

const initialEdges: Edge[] = []

function Graph({ strength = -1000, distance = 1000, data, onNodeRightClick }: GraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when data changes
  useEffect(() => {
    if (data) {
      const newNodes = data.nodes.map((node) => ({
        id: node.id,
        position: { x: node.x ? node.x : Math.random() * 1000, y: node.y ? node.y : Math.random() * 1000 },
        data: { label: <GraphNode node={node} onNodeRightClick={onNodeRightClick}/> },
      }));

      const newEdges = data.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      }));

      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [data, setNodes, setEdges, onNodeRightClick]);

  const dragEvents = useForceLayout({ strength, distance });

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeOrigin={nodeOrigin}
        onNodeDragStart={dragEvents.start}
        onNodeDrag={dragEvents.drag}
        onNodeDragStop={dragEvents.stop}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        defaultViewport={{
          x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
          y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
          zoom: 0,
        }}
        fitView
      >
        <Background color='#ccc' variant={ BackgroundVariant.Dots } />
      </ReactFlow>
    </div>
  );
}

export default Graph;