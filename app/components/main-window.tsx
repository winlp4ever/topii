'use client';
import React from 'react'
import { useAppStore } from '../store';
import { GraphView } from './graph-view';
import { ResponseFocus } from './response-focus';
import SearchBar from './search-bar';

// This is the main window that displays the graph view and response focus
export function MainWindow() {
  const corpusId = useAppStore((state) => state.corpusId);

  // We can toggle between “Graph view” and “Response focus”
  const [tab, setTab] = React.useState<'graph' | 'response'>('graph')

  return (
    <>
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 z-50 flex justify-center items-center">
        <span>Corpus @{corpusId}</span>
        <button onClick={() => setTab('response')}>Response Focus</button>
        <button onClick={() => setTab('graph')}>Graph View</button>
      </div>

      {tab === 'graph' && <GraphView />}
      {
        tab === 'response' &&
        <div>
          <ResponseFocus />
        </div>
      }
      <SearchBar />
    </>
  );
}
