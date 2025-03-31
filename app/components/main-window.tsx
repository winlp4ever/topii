'use client';
import React from 'react';
import { Text, GitGraph } from 'lucide-react';

import { useAppStore } from '../store';
import GraphView from './graph/graph-view';
import { ResponseFocus } from './response-focus';
import SearchBar from './chat/search-bar';
import { GraphViewMode } from '../types/graphViewMode';


// This is the main window that displays the graph view and response focus
export function MainWindow() {
  const corpusId = useAppStore((state) => state.corpusId);
  const loadCorpus = useAppStore((state) => state.loadCorpus);
  // we can toggle between "graph" and "response" views
  const viewMode = useAppStore((state) => state.viewMode);
  const setViewMode = useAppStore((state) => state.setViewMode);

  const handleHomeCorpusClick = () => {
    if (!corpusId) {
      return;
    }
    loadCorpus(corpusId);
  }

  const focusClassName = 'text-stone-900'

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
            className={'transition-all hover:underline flex flex-row items-center justify-center gap-2 ' + (viewMode === GraphViewMode.INSIGHT ? focusClassName : 'text-muted-foreground')}
            onClick={() => setViewMode(GraphViewMode.INSIGHT)}
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
            className={'transition-all hover:underline flex flex-row items-center justify-center gap-2 ' + (viewMode === GraphViewMode.GRAPH ? focusClassName : 'text-muted-foreground')}
            onClick={() => setViewMode(GraphViewMode.GRAPH)}
          >
            <span className='text-sm'>
              <GitGraph className='w-4 h-4' />
            </span>
            <span className='text-sm'>
              {"Graph"}
            </span>
          </button>
        </span>
      </div>
      {
        viewMode === GraphViewMode.GRAPH &&
        <GraphView />
      }
      {
        viewMode === GraphViewMode.INSIGHT &&
        <ResponseFocus />
      }
      <SearchBar />
    </>
  );
}
