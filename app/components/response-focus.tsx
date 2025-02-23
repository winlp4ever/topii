'use client';
import React from 'react';
import { useAppStore } from '../store';
import EntityCard from './entity/card';

// This is the response focus component
export function ResponseFocus() {
  const response = useAppStore((state) => state.response);

  let cpn;
  if (!response) {
    cpn = <div>No response to display.</div>;
  } else {
    cpn = <EntityCard displayMode='full' node={response} />;
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
