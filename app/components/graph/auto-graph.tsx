'use client';
import React from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// import useForceLayout from './layout/useForceLayout';
import useAutoLayout, { LayoutOptions } from './layout/use-auto-layout';


import { ExpandableNode, GraphData } from '../../types/graph';
import DashedEdge from './edges/dashed-edge';
import { useStruct } from './use-struct';
import GraphNode from './nodes/graph-node';

type GraphProps = {
  strength?: number;
  distance?: number;
  data: GraphData;
};

// const nodeOrigin: NodeOrigin = [0.5, 0.5];

const nodeTypes = {
  default: GraphNode,
};

const edgeTypes = {
  dashed: DashedEdge,
};

const defaultEdgeOptions = { style: { stroke: '#ff66aa', strokeWidth: 1 }, type: 'dashed' };

const defaultLayoutOptions = {
  algorithm: 'dagre',
  direction: 'LR',
  spacing: [20, 80],
} as LayoutOptions;

function AutoGraph({ data }: GraphProps) {
  const [nodes, , onNodesChange] = useNodesState([] as ExpandableNode[]);
  const [edges, , onEdgesChange] = useEdgesState([] as Edge[]);

  useStruct(data);

  // this hook handles the computation of the layout once the elements or the direction changes
  useAutoLayout(defaultLayoutOptions);


  return (
    <div style={{ height: '100vh', width: '100vw' }} className='bg-stone-50' >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        zoomOnDoubleClick={false}
        fitView
      >
        <Background color='#71717a' variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}

export default AutoGraph;