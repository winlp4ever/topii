"use client";
import React, { useState, KeyboardEvent } from 'react';
import { useAppStore } from '../store';
import { Command, CommandInput, CommandList, CommandIcon } from './ui/command';

const SearchBar: React.FC = () => {
  const setInput = useAppStore((state) => state.setInput);
  const setInputType = useAppStore((state) => state.setInputType);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const loadingStatus = useAppStore((state) => state.loadingStatus);

  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    // Implement your search logic here
    if (!query.trim()) {
      return;
    }
    setInputType('query');
    setInput(query);

    searchQuery(query);
    setQuery('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' || (e.key === 'Backspace' && !query)) {
      e.preventDefault()
    } else if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 z-50 flex justify-center items-center">
      <Command onKeyDown={handleKeyDown} className="md:min-w-[650px] focus:border-stone-400 shadow-xl rounded-xl" >
        <div className="flex flex-row items-center space-x-1 px-3">
          <CommandInput
            placeholder='Enter your query ...'
            value={query}
            onValueChange={setQuery}
            className='text-sm py-4'
          />
          <CommandIcon
            loadingStatus={loadingStatus === "RUNNING" ? "loading": "loaded"}
            disabled={loadingStatus === "RUNNING" ? true: false}
            onClick={handleSearch}
          />
        </div>
        <CommandList>
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchBar;
