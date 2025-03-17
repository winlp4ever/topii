'use client';
import React from 'react';
import { useAppStore } from '../../store';
import { ReactFlowProvider } from '@xyflow/react';
import { LoadingView } from '../loading-view';
import { AutoExpandGraph } from './expand-graph';


const GraphView: React.FC = () => {
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
            <AutoExpandGraph data={data.data} />
          </ReactFlowProvider>
        )
      }
    </div>
  );
}

export default GraphView;