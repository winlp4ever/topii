'use client';
import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import EntityCard from './entity/card';
import { Node_ } from '../types/graph';
import { filterSourceNodes } from './utils';
import { LoadingView } from './loading-view';

// This is the response focus component
export function ResponseFocus() {
  const loadingStatus = useAppStore((state) => state.loadingStatus);
  const response = useAppStore((state) => state.response);
  const graph = useAppStore((state) => state.graph);

  const [sourceNodes, setSourceNodes] = React.useState<Node_[]>([]);

  useEffect(() => {
    if (graph !== null && response !== null) {
      const nodes = graph.nodes.slice(1);
      const srcNodes = filterSourceNodes(response.id, nodes, graph.edges);
      setSourceNodes(srcNodes);
    }
  }, [response, graph]);

  let cpn;
  if (!response) {
    cpn = <div>No response to display.</div>;
  } else {
    cpn = <EntityCard
      displayMode='full'
      node={response}
      subNodes={sourceNodes}
    />;
  }

  return (
    <>
      {
        loadingStatus !== 'success' && (
          <LoadingView responseViewType='Response' />
        )
      }
      {
        loadingStatus === 'success' && (
          <div
            style={{ height: '100vh', width: '100vw' }}
            className='flex flex-col items-center justify-center overflow-y-scroll'
          >
            <div
              className='h-full sm:max-w-[800px]'
            >
              <div className='mt-32'>
                {cpn}
              </div>
              <div className='h-32'>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
