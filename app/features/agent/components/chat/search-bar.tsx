"use client";
import React, { useState, KeyboardEvent } from 'react';
import { useAppStore } from '../../../../store';
import { Command, CommandInput, CommandList, CommandIcon } from '../../../../components/ui/command';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LLMDescription, LLMEnum, LLMName } from '../../../../types/ai';


/**
 * ModelCard is a component that displays the name and description of a LLM model
 * in a hover card format. It is used within the ModelChoiceMenu to provide
 * additional information about each model.
 */
const ModelCard: React.FC<{ model: LLMEnum }> = ({ model }) => {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger className='text-mono'>{LLMName[model]}</HoverCardTrigger>
      <HoverCardContent className='w-48 rounded-xl border border-stone-200 bg-stone-100 shadow' side="left" sideOffset={15}>
        <div className=''>
          {LLMDescription[model]}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}


/**
 * ModelChoiceMenu is a component that allows users to select an AI model
 * from a dropdown menu. It uses the Select component from the UI library
 * to create a styled dropdown with model options.
 */
const ModelChoiceMenu = () => {
  const setModelChoice = useAppStore((state) => state.setAIModel);
  const modelChoice = useAppStore((state) => state.aiSettings.model);

  const handleModelChange = (model: LLMEnum) => {
    setModelChoice(model);
    console.log('Model changed to:', model);
  };

  return (
    <Select onValueChange={handleModelChange} defaultValue={modelChoice}>
      <SelectTrigger className="w-24 rounded-full bg-stone-100 border-none text-xs w-auto h-auto">
        <SelectValue defaultValue={modelChoice} />
      </SelectTrigger>
      <SelectContent className='overflow-visible'>
        <SelectGroup>
          <SelectLabel>Models</SelectLabel>
          {
            Object.values(LLMEnum).map((model) => (
              <SelectItem key={model} value={model} className='text-xs'>
                <ModelCard model={model} />
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


/**
 * SearchBar is a component that provides a search input field
 * and a button to trigger the search. It uses the Command component
 * from the UI library to create a styled input and button.
 */
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

    searchQuery(query, null);
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
      <div className='flex flex-col space-y-2'>
        <div>
          <Command onKeyDown={handleKeyDown} className="md:min-w-[800px] rounded-3xl p-3 pt-0 bg-stone-50 text-lg border border-stone-300" >
            <div className="flex flex-col items-center space-y-1 items-stretch">
              <div className='p-2'>
                <CommandInput
                  placeholder='Enter your query ...'
                  value={query}
                  onValueChange={setQuery}
                  className='text-md'
                />
              </div>
              <div className='flex justify-start'>
                <ModelChoiceMenu />
                <CommandIcon
                  loadingStatus={loadingStatus === "RUNNING" ? "loading": "loaded"}
                  disabled={loadingStatus === "RUNNING" ? true: false}
                  onClick={handleSearch}
                  className={'ml-auto border-none' + (loadingStatus === "RUNNING" ? ' cursor-not-allowed bg-stone-100' : ' cursor-pointer bg-stone-800 text-stone-50 hover:bg-stone-900 hover:text-stone-100')}
                />
              </div>

            </div>
            <CommandList>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
