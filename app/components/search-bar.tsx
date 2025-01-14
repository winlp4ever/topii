"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Input } from "@/components/ui/input";

import { Search } from 'lucide-react'; // Import the Search icon from lucide-react
import { Button } from '@/components/ui/button';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', query);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 z-50 flex justify-center items-center">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter your query..."
        className="w-64 mr-2 bg-transparent border-none focus:ring-0"
      />
      <Button onClick={handleSearch} className="p-2" variant='secondary'>
        <Search className="w-6 h-6 text-blue-500 hover:text-blue-600" />
      </Button>
    </div>
  );
};

export default SearchBar;
