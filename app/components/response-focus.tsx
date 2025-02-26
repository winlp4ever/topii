'use client';
import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import EntityCard from './entity/card';
import { Node_ } from '../types/graph';
import { LoadingView } from './loading-view';

// This is the response focus component
export function ResponseFocus() {
  const loadingStatus = useAppStore((state) => state.loadingStatus);
  const data = useAppStore((state) => state.data);

  const [response, setResponse] = React.useState<Node_ | null>(null);
  const [sourceNodes, setSourceNodes] = React.useState<Node_[]>([]);

  useEffect(() => {
    if (data === null) {
      setResponse(null);
      setSourceNodes([]);
      return;
    }
    if (data !== null && data.data !== null) {
      const graph = data.data;
      const response = graph.nodes[0];
      const nodes = graph.nodes.slice(1);
      // const srcNodes = filterSourceNodes(response.id, nodes, graph.edges);
      setSourceNodes(nodes);
      setResponse(response);
    }
  }, [data]);

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
        loadingStatus !== 'COMPLETED' && (
          <LoadingView responseViewType='Response' viewMode='compact' />
        )
      }
      {
        response !== null && (
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
