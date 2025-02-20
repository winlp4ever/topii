'use client';
import React from 'react';
import { useAppStore } from '../store';
import { AnswerView } from './nodes/answer-node';
import { DocView } from './nodes/doc-node';
import { CorpusView } from './nodes/corpus-node';

// This is the response focus component
export function ResponseFocus() {
  const response = useAppStore((state) => state.response);

  let cpn;
  if (!response) {
    cpn = <div>No response to display.</div>;
  }

  // e.g. if response is an Answer node:
  else if (response.answer) {
    cpn = <AnswerView answer={response.answer} />;
  }

  // or if response.doc, show doc details, etc.
  else if (response.doc) {
    cpn = <DocView doc={response.doc} />;
  }

  else if (response.corpus) {
    cpn = <CorpusView corpus={response.corpus} />;
  }
  else {
    cpn= <div>Unrecognized node type.</div>;
  }
  return (
    <div
      style={{ height: '100vh', width: '100vw' }}
      className='flex flex-col items-center justify-center overflow-y-scroll'
    >
      <div
        className='h-full sm:max-w-[800px]'
      >
        <div className='mt-32'>
          {cpn}
        </div>
        <div className='h-32'>
        </div>
      </div>
    </div>
  )
}
