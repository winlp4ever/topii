'use client';
import React, { useState } from 'react';
import { type Stage, useAppStore } from '../store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

// This is the stage selector component
function StageSelector() {
  const setStage = useAppStore((state) => state.setStage);

  const handleStageChange = (value: string) => {
    console.log('stage change', value);
    setStage(value as Stage);
  }

  return (
    <Select onValueChange={handleStageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a stage" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Stage</SelectLabel>
          {
            ['local', 'dev', 'preprod', 'prod', 'test'].map((stage_) => (
              <SelectItem key={stage_} value={stage_}>{stage_}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function WelcomeWindow() {
  const [tempCorpusId, setTempCorpusId] = useState('');
  const loadCorpus = useAppStore((state) => state.loadCorpus);

  const handleGoToLibrary = () => {
    // parse corpusId into number and load
    const idNum = parseInt(tempCorpusId, 10)
    if (!Number.isNaN(idNum)) {
      console.log('loading corpus', idNum)
      loadCorpus(idNum)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='text-5xl w-1/2 text-center items-center justify-center'>
        <h2>Please enter a corpus ID</h2>

        <StageSelector />

        <Input
          type="text"
          placeholder="Corpus ID"
          value={tempCorpusId}
          onChange={(e) => setTempCorpusId(e.target.value)}
        />
        <Button
          disabled={!tempCorpusId}
          onClick={handleGoToLibrary}
          variant={!tempCorpusId ? 'ghost' : 'default'}
        >
          Go to library
        </Button>
      </div>
    </div>
  )
}