"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Concept } from "../../types/graph";
import { Key } from "lucide-react";
import MarkdownView from "../markdown-view";
import { trimText } from "../utils";

const ConceptNode: React.FC<{ concept: Concept }> = ({ concept }) => {
  const def = trimText(concept.definition, 200);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
          <Button className="absolute -left-4 ml-4 px-4 py-6 rounded-l-full rounded-r-md text-xl" variant='amber'>
            <span className="flex items-center justify-center w-4 h-4 bg-amber-500 rounded-full"></span>
            <span>🔑</span>
            <span className="">{ concept.label }</span>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96 border border-amber-400 p-6 rounded-xl shadow foreground bg-card transform translate-x-1/2">
        <div className="space-y-2 w-full">
          <div className='flex space-x-1 flex-row items-center text-amber-500'>
            <Key strokeWidth={1.5} className='h-4 w-4'/>
            <span className='text-xs font-normal'>{ "Concept" }</span>
          </div>
          <MarkdownView content={ `# ${concept.label}\n\n---\n\n${def}` } />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ConceptNode;