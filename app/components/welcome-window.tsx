'use client';
import React, { useState } from 'react';
import { useAppStore } from '../store';

export function WelcomeWindow() {
  const [tempCorpusId, setTempCorpusId] = useState('');
  const stage = useAppStore((state) => state.stage);
  const setStage = useAppStore((state) => state.setStage);
  const loadCorpus = useAppStore((state) => state.loadCorpus);

  const handleGoToLibrary = () => {
    // parse corpusId into number and load
    const idNum = parseInt(tempCorpusId, 10)
    if (!Number.isNaN(idNum)) {
      loadCorpus(idNum)
    }
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd' }}>
      <h2>Please enter a corpus ID</h2>

      <select
        value={stage}
        onChange={(e) => setStage(e.target.value as typeof stage)}
      >
        <option value="local">local</option>
        <option value="dev">dev</option>
        <option value="preprod">preprod</option>
        <option value="prod">prod</option>
        <option value="test">test</option>
      </select>

      <br />
      <input
        type="text"
        placeholder="Corpus ID"
        value={tempCorpusId}
        onChange={(e) => setTempCorpusId(e.target.value)}
      />
      <button disabled={!tempCorpusId} onClick={handleGoToLibrary}>
        Go to library
      </button>
    </div>
  )
}