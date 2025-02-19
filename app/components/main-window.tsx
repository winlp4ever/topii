'use client';
import React from 'react'
import { useAppStore } from '../store';
import { GraphView } from './graph-view';
import { ResponseFocus } from './response-focus';
import SearchBar from './search-bar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartNetwork, LetterText } from 'lucide-react';
import { LoadingView } from './loading-view';

// This is the main window that displays the graph view and response focus
export function MainWindow() {
  const corpusId = useAppStore((state) => state.corpusId);
  const loadingStatus = useAppStore((state) => state.loadingStatus);

  // We can toggle between “Graph view” and “Response focus”
  const [tab, setTab] = React.useState<'graph' | 'response'>('graph');

  const handleTabChange = (value: string) => {
    setTab(value as 'graph' | 'response');
  }

  return (
    <>
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 p-4 z-50 flex flex-col space-y-4 justify-center items-center w-[650px]" >
        <Tabs defaultValue="graph" onValueChange={handleTabChange} className="w-full" >
          <TabsList className="grid w-full flex bg-gray-100 space-x-4" >
            <span className='text-sm px-3 py-1 text-center' >Corpus @{corpusId}</span>
            <TabsTrigger value="graph" className='space-x-2 flex-1' >
              <ChartNetwork className='h-4 w-4' />
              <span>Graph View</span>
            </TabsTrigger>
            <TabsTrigger value="response" className='space-x-2 flex-1' >
              <LetterText className='h-4 w-4' />
              <span>Response Focus</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {
        loadingStatus === 'loading' &&
        <LoadingView />
      }
      {
        tab === 'graph' && loadingStatus === 'loaded' &&
        <GraphView />
      }
      {
        tab === 'response' && loadingStatus === 'loaded' &&
        <ResponseFocus />
      }
      <SearchBar />
    </>
  );
}
