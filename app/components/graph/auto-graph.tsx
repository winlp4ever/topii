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
  useNodesInitialized,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// import useForceLayout from './layout/useForceLayout';
import useAutoLayout, { LayoutOptions } from './layout/use-auto-layout';


import { GraphData } from '../../types/graph';
import DashedEdge from './edges/dashed-edge';
import { createStruct } from './use-struct';
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

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const defaultLayoutOptions = {
  algorithm: 'dagre',
  direction: 'LR',
  spacing: [20, 80],
} as LayoutOptions;

function AutoGraph({ data }: GraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodesInitialized = useNodesInitialized();

  const [finishSetup, setFinishSetup] = React.useState(false);

  // Update nodes and edges when data changes
  useEffect(() => {
    setFinishSetup(false);
    console.log('changes')
    if (data) {
      const { nodes: newNodes, edges: newEdges } = createStruct(data);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [data, setNodes, setEdges]);

  useEffect(() => {
    if (!finishSetup && nodesInitialized) {
      setFinishSetup(true);
    }
  }
  , [nodesInitialized, finishSetup]);


  const { fitView } = useReactFlow();

  // this hook handles the computation of the layout once the elements or the direction changes
  useAutoLayout(defaultLayoutOptions);


  // const dragEvents = useForceLayout({ strength, distance });

  // every time our nodes change, we want to center the graph again
  useEffect(() => {
    console.log('hmm')
    if (finishSetup) {
      fitView();
    }
  }, [finishSetup, fitView]);

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