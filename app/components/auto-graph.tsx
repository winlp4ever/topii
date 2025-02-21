'use client';
import React, { useEffect } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  BackgroundVariant,
  Edge,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// import useForceLayout from './layout/useForceLayout';
import useAutoLayout, { type LayoutOptions } from './layout/useAutoLayout';

import { useControls, button } from 'leva';

import { GraphData } from '../types/graph';
import GraphNode from './nodes/graph-node';
import DashedEdge from './nodes/dashed-edge';
import { getId } from './layout/utils';

type GraphProps = {
  strength?: number;
  distance?: number;
  data: GraphData;
  onNodeRightClick?: (nodeId: string) => void;
};

// const nodeOrigin: NodeOrigin = [0.5, 0.5];

const edgeTypes = {
  dashed: DashedEdge,
};

const defaultEdgeOptions = { style: { stroke: '#ff66aa', strokeWidth: 2 }, type: 'dashed' };

const initialNodes: Node[] = []

const initialEdges: Edge[] = []

function AutoGraph({ data, onNodeRightClick }: GraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when data changes
  useEffect(() => {
    if (data) {
      const newNodes = data.nodes.map((node) => ({
        id: node.id,
        position: { x: node.x ? node.x : 0, y: node.y ? node.y : 0 },
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

  const { fitView, addNodes } = useReactFlow();

  const layoutOptions = useControls({
    algorithm: {
      value: 'd3-hierarchy' as LayoutOptions['algorithm'],
      options: ['dagre', 'd3-hierarchy', 'elk'] as LayoutOptions['algorithm'][],
    },
    direction: {
      value: 'LR' as LayoutOptions['direction'],
      options: {
        down: 'TB',
        right: 'LR',
        up: 'BT',
        left: 'RL',
      } as Record<string, LayoutOptions['direction']>,
    },
    spacing: [400, 50],
    'add root node': button(() =>
      addNodes({
        id: getId(),
        position: { x: 0, y: 0 },
        data: { label: `New Node` },
        style: { opacity: 0 },
      })
    ),
  });

  // this hook handles the computation of the layout once the elements or the direction changes
  useAutoLayout(layoutOptions);


  // const dragEvents = useForceLayout({ strength, distance });

  // every time our nodes change, we want to center the graph again
  useEffect(() => {
    fitView();
  }, [nodes, fitView]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesDraggable={true}
        defaultEdgeOptions={defaultEdgeOptions}
        edgeTypes={edgeTypes}
        zoomOnDoubleClick={false}
      >
        <Background color='#ccc' variant={ BackgroundVariant.Dots } />
      </ReactFlow>
    </div>
  );
}

export default AutoGraph;