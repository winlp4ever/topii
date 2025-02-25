'use client';
import React from 'react';
import { useAppStore } from '../store';
import { ReactFlowProvider } from '@xyflow/react';
import ForceGraph from './force-graph';
import AutoGraph from './auto-graph';
import { LoadingView } from './loading-view';


const GraphView: React.FC<{ layout: 'force' | 'auto' }> = ({ layout }) => {
  const loadingStatus = useAppStore((state) => state.loadingStatus);
  const data = useAppStore((state) => state.data);

  console.log(loadingStatus);

  return (
    <div>
      {
        loadingStatus !== 'COMPLETED' && (
          <LoadingView />
        )
      }
      {
        loadingStatus === 'COMPLETED' && data !== null && data.data !== null &&  (
          <ReactFlowProvider>
            {
              layout === 'force' ? (
                <ForceGraph data={data.data} />
              ) : <AutoGraph data={data.data} />
            }
          </ReactFlowProvider>
        )
      }
    </div>
  );
}

export default GraphView;