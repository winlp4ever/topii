"use client";
import React, { useState, KeyboardEvent } from 'react';
import { useAppStore } from '../store';
import { Command, CommandInput, CommandList } from '@/components/ui/command';

const SearchBar: React.FC = () => {
  const setInput = useAppStore((state) => state.setInput);
  const setInputType = useAppStore((state) => state.setInputType);
  const searchQuery = useAppStore((state) => state.searchQuery);

  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    // Implement your search logic here
    if (!query.trim()) {
      return;
    }
    console.log('Searching for:', query);
    setInputType('query');
    setInput(query);
    searchQuery(query);
    setQuery('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === 'Escape' || (e.key === 'Backspace' && !query)) {
      e.preventDefault()
    } else if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 z-50 flex justify-center items-center">
      <Command onKeyDown={handleKeyDown} className="rounded-lg shadown-md md:min-w-[650px] border" >
        <CommandInput
          placeholder='Enter your query ...'
          value={query}
          onValueChange={setQuery}
          className='text-md'
        />
        <CommandList></CommandList>
      </Command>
    </div>
  );
};

export default SearchBar;
