"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";

import { Concept } from "../../types/graph";
import { BookA } from "lucide-react";

const ConceptNode: React.FC<{ concept: Concept }> = ({ concept }) => {
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
      <PopoverContent className="w-80 bg-amber-50 border-amber-600 p-0">
        <div className='bg-amber-100 rounded-t-lg px-4 py-2 text-accent-foreground flex space-x-2 items-center'>
          <BookA className='w-4 h-4 text-accent-foreground' />
          <span className='text-sm font-semibold'>{ "Concept" }</span>
        </div>
        <div className="flex justify-between space-x-4 px-4 py-2">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{ concept.label }</h4>
            <Separator className="my-4" />
            <p className="text-sm">
              { concept.definition }
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ConceptNode;