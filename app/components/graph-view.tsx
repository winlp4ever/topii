'use client';
import React from 'react';
import { useAppStore } from '../store';
import { ReactFlowProvider } from '@xyflow/react';
import ForceGraph from './force-graph';
import AutoGraph from './auto-graph';


const GraphView: React.FC<{ layout: 'force' | 'auto' }> = ({ layout }) => {
  const graph = useAppStore((state) => state.graph);

  // Example of how to handle “right-click” / “focus node”:
  const focusNode = useAppStore((state) => state.focusNode);

  // You could pass an onNodeRightClick callback to Graph
  const handleNodeRightClick = (nodeId: string) => {
    focusNode(nodeId);
  }

  if (!graph) {
    return <div>No graph loaded.</div>;
  }

  return (
    <div>
      <ReactFlowProvider>
        {
          layout === 'force' ? (
            <ForceGraph data={graph} onNodeRightClick={handleNodeRightClick} />
          ) : <AutoGraph data={graph} onNodeRightClick={handleNodeRightClick} />
        }
      </ReactFlowProvider>
    </div>
  );
}

export default GraphView;