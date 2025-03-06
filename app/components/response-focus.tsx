'use client';
import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import EntityCard from './entity/card';
import { Node_ } from '../types/graph';
import { LoadingView } from './loading-view';
import { NodeTypeColorMapping } from './entity/color-mapping';
import { Repeat } from 'lucide-react';


const UserMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className='flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-stone-800 text-primary-foreground w-auto'>
      {message}
    </div>
  );
}


const ReactionBar: React.FC = () => {
  const input = useAppStore((state) => state.input);
  const searchQuery = useAppStore((state) => state.searchQuery);

  const regen = () => {
    if (!input) {
      return;
    }
    searchQuery(input);
  }

  return (
    <div className='flex flex-row gap-2 w-full'>
      <div className='flex flex-row gap-2 items-center p-1'>
        <button
          className='flex items-center gap-1 text-xs border-none px-2 py-1 rounded-lg text-stone-400 hover:text-stone-700 transition-all duration-200 ease-in-out'
          onAbort={regen}
        >
          <Repeat strokeWidth={1.5} className="h-4 w-4" />
          <span>{"Rewrite"}</span>
        </button>
      </div>
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
      <div
        style={{ height: '100vh', width: '100vw' }}
        className='flex flex-col items-center justify-center overflow-y-scroll bg-stone-100'
      >
        <div
          className='h-full sm:max-w-[800px]'
        >
          <div className='mt-32 flex flex-col items-end space-y-4'>
            {
              input && inputType == 'query' && (
                <UserMessage message={input} />
              )
            }
            {
              response && <div>
                {cpn}
                <ReactionBar />
              </div>
            }
            <div className='h-48'>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
