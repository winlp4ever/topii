'use client';
import React, { useEffect } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Edge,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

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

  const { fitView } = useReactFlow();

  // trigger fitView when nodes are ready
  useEffect(() => {
    if (data.nodes.length > 0) {
      const timeout = setTimeout(() => {
        fitView({ padding: 0.2 });
      }, 100); // small delay to ensure layout is applied

      return () => clearTimeout(timeout);
    }
  }, [data, fitView]);


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
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}

export default AutoGraph;