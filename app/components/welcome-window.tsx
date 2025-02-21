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
    <Select onValueChange={handleStageChange} defaultValue='dev'>
      <SelectTrigger className="w-[150px]">
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
      loadCorpus(`corpus_${idNum}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='w-1/2 text-center flex flex-col items-center justify-center space-y-4'>
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Welcome back, please enter a corpus ID
        </h1>
        <Input
          className='text-center border-none text-2xl outline-none w-1/2 md:text-2xl focus-visible:ring-0 font-mono'
          type="text"
          placeholder="0"
          value={tempCorpusId}
          onChange={(e) => setTempCorpusId(e.target.value)}
        />
        <StageSelector />
        <Button
          disabled={!tempCorpusId}
          onClick={handleGoToLibrary}
          variant={!tempCorpusId ? 'ghost' : 'default'}
          className='w-[150px]'
        >
          Go to library
        </Button>
      </div>
    </div>
  )
}