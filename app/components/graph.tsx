'use client';
import React from 'react';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import GraphNode from '../assets/graph_node';
import { useQuery } from '@tanstack/react-query';
import { GraphData } from '../types/graph';
import { fetchGraph } from '../lib/api';
import SearchBar from './search-bar';


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
          data: { label: <GraphNode node={v} /> },
          position: { x: v.x ? v.x: Math.random() * 1000, y: v.y ? v.y: Math.random() * 1000 }
        }
      })} defaultEdges={data?.edges} fitView>
        <Background color='#ccc' variant={ BackgroundVariant.Dots } />
      </ReactFlow>
      <SearchBar />
    </div>
  );
};

export default Graph;