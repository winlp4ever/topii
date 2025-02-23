'use client';
import React from 'react';
import { useAppStore } from '../store';
import { ReactFlowProvider } from '@xyflow/react';
import ForceGraph from './force-graph';
import AutoGraph from './auto-graph';
import { LoadingView } from './loading-view';


const GraphView: React.FC<{ layout: 'force' | 'auto' }> = ({ layout }) => {
  const loadingStatus = useAppStore((state) => state.loadingStatus);
  const graph = useAppStore((state) => state.graph);

  console.log(loadingStatus)

  if (!graph) {
    return <div>No graph loaded.</div>;
  }

  return (
    <div>
      {
        loadingStatus !== 'success' && (
          <LoadingView />
        )
      }
      {
        loadingStatus === 'success' && (
          <ReactFlowProvider>
            {
              layout === 'force' ? (
                <ForceGraph data={graph} />
              ) : <AutoGraph data={graph} />
            }
          </ReactFlowProvider>
        )
      }
    </div>
  );
}

export default GraphView;