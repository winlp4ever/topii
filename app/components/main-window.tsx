'use client';
import React from 'react'
import { useAppStore } from '../store';
import GraphView from './graph/graph-view';
import { ResponseFocus } from './response-focus';
import SearchBar from './chat/search-bar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text, Network, AtSign } from 'lucide-react';

// This is the main window that displays the graph view and response focus
export function MainWindow() {
  const corpusId = useAppStore((state) => state.corpusId);
  const loadCorpus = useAppStore((state) => state.loadCorpus);
  // we can toggle between "graph" and "response" views
  const [tab, setTab] = React.useState<'graph' | 'response'>('graph');

  const handleTabChange = (value: string) => {
    setTab(value as 'graph' | 'response');
  }

  const handleHomeCorpusClick = () => {
    if (!corpusId) {
      return;
    }
    loadCorpus(corpusId);
  }


  let corpusLabel;
  if (!corpusId) {
    corpusLabel = 'No corpus selected';
  } else {
    corpusLabel = corpusId.split('_')[1];
  }

  return (
    <>
      <div className={`
          fixed top-10 left-1/2 transform -translate-x-1/2 p-2 z-50 flex flex-row w-auto
          bg-stone-200 rounded-lg justify-center items-center
        `}
      >
        <span className='text-xs px-3 py-1 text-center' >
          <button
            className='transition-all hover:underline text-muted-foreground'
            onClick={handleHomeCorpusClick}
          >
            {"Library"}
          </button>
          <AtSign strokeWidth={1.5} className='h-4 w-4 inline ml-1' />
          <span className='font-mono'>{corpusLabel}</span>
        </span>
        <span className='w-2 h-5 rounded-lg bg-white'></span>
        <Tabs defaultValue="graph" onValueChange={handleTabChange} className="" >
          <TabsList
            className="flex space-x-2 flex-row justify-around p-0 bg-transparent h-auto"
          >
            <TabsTrigger
              value="response"
              className='space-x-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent text-xs font-normal text-gray-400'
            >
              <Text className='h-4 w-4' strokeWidth={1.5}/>
              <span>Insight View</span>
            </TabsTrigger>
            <TabsTrigger
              value="graph"
              className='space-x-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent text-xs font-normal text-gray-400'
            >
              <Network className='h-4 w-4' strokeWidth={1.5} />
              <span>Mindmap</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {
        tab === 'graph' &&
        <GraphView />
      }
      {
        tab === 'response' &&
        <ResponseFocus />
      }
      <SearchBar />
    </>
  );
}
