'use client';
import React from 'react';
import { ReactFlow, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import GraphNode from '../assets/graph_node';

const initialNodes: Node[] =[
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    // you can also pass a React component as a label
    data: {
      label: <GraphNode label="a long word" definition="You can add components to your app using the cli."/>
    },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

const Graph: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow defaultNodes={initialNodes} defaultEdges={initialEdges} fitView>
      </ReactFlow>
    </div>
  );
};

export default Graph;