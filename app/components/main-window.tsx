'use client';
import React from 'react'
import { useAppStore } from '../store';
import { GraphView } from './graph-view';
import { ResponseFocus } from './response-focus';

export function MainWindow() {
  const corpusId = useAppStore((state) => state.corpusId);
  const input = useAppStore((state) => state.input);
  const setInputType = useAppStore((state) => state.setInputType);
  const setInput = useAppStore((state) => state.setInput);
  const searchQuery = useAppStore((state) => state.searchQuery);

  const handleSearch = () => {
    if (!input) return
    setInputType('query')
    searchQuery(input)
  }

  // We can toggle between “Graph view” and “Response focus”
  const [tab, setTab] = React.useState<'graph' | 'response'>('graph')

  return (
    <div style={{ padding: '1rem' }}>
      <div>
        <h3>Inside corpus @{corpusId}</h3>
        <button onClick={() => setTab('response')}>Response Focus</button>
        <button onClick={() => setTab('graph')}>Graph View</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        {tab === 'graph' && <GraphView />}
        {tab === 'response' && <ResponseFocus />}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Enter your query"
          value={input || ''}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch}>Send</button>
      </div>
    </div>
  )
}
