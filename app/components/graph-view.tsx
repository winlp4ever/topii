'use client';
import React from 'react';
import { useAppStore } from '../store';
import Graph from './graph';
import { ReactFlowProvider } from '@xyflow/react';

export function GraphView() {
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
        <Graph data={graph} onNodeRightClick={handleNodeRightClick} />
      </ReactFlowProvider>
    </div>
  );
}