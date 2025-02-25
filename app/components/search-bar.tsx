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
      <Command onKeyDown={handleKeyDown} className="md:min-w-[650px] border shadow rounded-lg" >
        <CommandInput
          placeholder='Enter your query ...'
          value={query}
          onValueChange={setQuery}
          className='text-sm'
        />
        <CommandList></CommandList>
      </Command>
    </div>
  );
};

export default SearchBar;
