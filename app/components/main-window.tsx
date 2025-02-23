'use client';
import React from 'react'
import { useAppStore } from '../store';
import GraphView from './graph-view';
import { ResponseFocus } from './response-focus';
import SearchBar from './search-bar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartNetwork, Text, FlipHorizontal2, Network, AtSign } from 'lucide-react';
import { LoadingView } from './loading-view';

// This is the main window that displays the graph view and response focus
export function MainWindow() {
  const corpusId = useAppStore((state) => state.corpusId);
  const loadingStatus = useAppStore((state) => state.loadingStatus);

  // we can toggle between "graph" and "response" views
  const [tab, setTab] = React.useState<'graph' | 'response'>('graph');
  const [layoutOption, setLayoutOption] = React.useState<'force' | 'auto'>('force');

  const handleTabChange = (value: string) => {
    setTab(value as 'graph' | 'response');
  }

  const handleLayoutChange = (value: string) => {
    setLayoutOption(value as 'force' | 'auto');
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
          bg-gray-200 rounded-lg justify-center items-center
        `}
      >
        <span className='text-xs px-3 py-1 text-center' ><AtSign strokeWidth={1.5} className='h-4 w-4 inline' /> <span className='font-mono'>{corpusLabel}</span></span>
        <span className='w-2 h-5 rounded-lg bg-white'></span>
        <Tabs defaultValue="graph" onValueChange={handleTabChange} className="" >
          <TabsList className="flex space-x-2 flex-row justify-around p-0 bg-transparent h-auto" >
            <TabsTrigger value="response" className='space-x-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent text-xs font-normal text-gray-400' >
              <Text className='h-4 w-4' strokeWidth={1.5}/>
              <span>Insight View</span>
            </TabsTrigger>
            <TabsTrigger value="graph" className='space-x-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent text-xs font-normal text-gray-400' >
              <ChartNetwork className='h-4 w-4' strokeWidth={1.5}/>
              <span>Graph View</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {
          tab === 'graph' &&
          <span className='w-2 h-5 rounded-lg bg-white'></span>
        }
        {
          tab === 'graph' &&
          <Tabs defaultValue="force" onValueChange={handleLayoutChange} className="ml-2" >
            <TabsList className="flex space-x-2 flex-row justify-around p-0 bg-transparent h-auto" >
              <TabsTrigger value="force" className='space-x-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent text-xs font-normal text-gray-400' >
                <FlipHorizontal2 className='h-4 w-4' strokeWidth={1.5} />
                <span>Force Layout</span>
              </TabsTrigger>
              <TabsTrigger value="auto" className='space-x-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent text-xs font-normal text-gray-400' >
                <Network className='h-4 w-4' strokeWidth={1.5} />
                <span>Auto Layout</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
      </div>
      {
        loadingStatus === 'loading' &&
        <LoadingView />
      }
      {
        tab === 'graph' && loadingStatus === 'loaded' &&
        <GraphView layout={ layoutOption }/>
      }
      {
        tab === 'response' && loadingStatus === 'loaded' &&
        <ResponseFocus />
      }
      <SearchBar />
    </>
  );
}
