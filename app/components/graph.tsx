'use client';
import React from 'react';
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import GraphNode from '../assets/graph_node';
import { useQuery } from '@tanstack/react-query';
import { GraphData } from '../types/graph';
import { fetchGraph } from '../lib/api';


const Graph: React.FC = () => {
  const { data, error, isLoading } = useQuery<GraphData, Error>({
    queryKey: ['graph', '1'],
    queryFn: () => fetchGraph('1')
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No data</p>;

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow defaultNodes={data?.nodes.map(v => {
        return {
          id: v.id,
          data: { label: <GraphNode label={v.id} definition={v.name} /> },
          position: { x: Math.random() * 1000, y: Math.random() * 1000 }
        }
      })} defaultEdges={data?.edges} fitView>
      </ReactFlow>
    </div>
  );
};

export default Graph;