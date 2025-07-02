'use client';
import React from 'react';
import { Text, GitGraph, BotMessageSquare } from 'lucide-react';

import { useAppStore } from '../store';
import GraphView from '../features/graph/components/graph-view';
import { ResponseFocus } from './response-focus';
import SearchBar from '../features/agent/components/chat/search-bar';
import { GraphViewMode } from '../types/graph-view-mode';
import { AgentView } from '../features/agent/components/agent';


// This is the main window that displays the graph view and response focus
export function MainWindow() {
  const corpusId = useAppStore((state) => state.corpusId);
  const loadCorpus = useAppStore((state) => state.loadCorpus);

  const viewMode = useAppStore((state) => state.viewMode);
  const setViewMode = useAppStore((state) => state.setViewMode);

  const handleHomeCorpusClick = () => {
    if (!corpusId) {
      return;
    }
    loadCorpus(corpusId);
  }

  const focusClass = 'transition-all hover:underline flex flex-row items-center justify-center gap-2 text-stone-900';
  const unfocusClass = 'transition-all hover:underline flex flex-row items-center justify-center gap-2 text-muted-foreground';
  const graphViewClass = viewMode === GraphViewMode.Graph ? focusClass : unfocusClass;
  const insightViewClass = viewMode === GraphViewMode.Insight ? focusClass : unfocusClass;
  const agentViewClass = viewMode === GraphViewMode.Agent ? focusClass : unfocusClass;

  return (
    <>
      <div className={`
          fixed top-10 left-1/2 transform -translate-x-1/2 p-2 z-50 flex flex-row w-auto
          bg-stone-100 rounded-2xl justify-center items-center
        `}
      >
        <span className='text-sm px-3 py-1 text-center' >
          <button
            className='transition-all hover:underline text-muted-foreground'
            onClick={handleHomeCorpusClick}
          >
            {"Library"}
          </button>
        </span>
        <span className='w-2 h-5 rounded-lg bg-white'></span>
        <span className='text-sm px-3 py-1 text-center' >
          <button
            className={insightViewClass}
            onClick={() => setViewMode(GraphViewMode.Insight)}
          >
            <span className='text-sm'>
              <Text className='w-4 h-4' />
            </span>
            <span className='text-sm'>
              {"Insight"}
            </span>
          </button>
        </span>
        <span className='text-sm px-3 py-1 text-center' >
          <button
            className={graphViewClass}
            onClick={() => setViewMode(GraphViewMode.Graph)}
          >
            <span className='text-sm'>
              <GitGraph className='w-4 h-4 flex-shrink-0' />
            </span>
            <span className='text-sm'>
              {"Graph"}
            </span>
          </button>
        </span>
        <span className='text-sm px-3 py-1 text-center' >
          <button
            className={agentViewClass}
            onClick={() => setViewMode(GraphViewMode.Agent)}
          >
            <span className='text-sm'>
              <BotMessageSquare className='w-4 h-4 flex-shrink-0' />
            </span>
            <span className='text-sm'>
              {"Agent"}
            </span>
          </button>
        </span>
      </div>
      {
        viewMode === GraphViewMode.Graph &&
        <GraphView />
      }
      {
        viewMode === GraphViewMode.Insight &&
        <ResponseFocus />
      }
      {
        viewMode === GraphViewMode.Agent &&
        <AgentView />
      }
      <SearchBar />
    </>
  );
}
