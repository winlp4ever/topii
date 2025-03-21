'use client';
import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import EntityCard from './entity/card';
import { Node_ } from '../types/graph';
import { LoadingView } from './loading-view';
import { NodeTypeColorMapping } from './entity/color-mapping';
import ReactionBar from './reaction-bar';
import { ScrollArea } from '@/components/ui/scroll-area';


const UserMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className='flex w-max max-w-[75%] flex-col gap-2 rounded-full px-5 py-2 text-base ml-auto bg-stone-100 w-auto'>
      {message}
    </div>
  );
}


// This is the response focus component
export function ResponseFocus() {
  const loadingStatus = useAppStore((state) => state.loadingStatus);
  const data = useAppStore((state) => state.data);
  const input = useAppStore((state) => state.input);
  const inputType = useAppStore((state) => state.inputType);
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
      colorMode={NodeTypeColorMapping[response.type]}
    />;
  }

  return (
    <>
      {
        loadingStatus !== 'COMPLETED' && (
          <LoadingView responseViewType='Response' viewMode='compact' />
        )
      }
      <ScrollArea
        className="h-screen w-screen bg-white"
      >
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <div
            className='h-full sm:max-w-[800px] w-[800px]'
          >
            <div className='mt-32 flex flex-col items-end space-y-8'>
              {
                input && inputType === 'query' && (
                  <UserMessage message={input} />
                )
              }
              {
                response && <div>
                  {cpn}
                  {
                    input && inputType === 'query' && loadingStatus === 'COMPLETED' && <ReactionBar />
                  }
                </div>
              }
              <div className='h-48'>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}
