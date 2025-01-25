"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";

import { Corpus } from "../../types/graph";

// Define the CorpusNode component as an arrow function with typed props
const CorpusNode: React.FC<{ corpus: Corpus }> = ({ corpus }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-24 h-24 p-0 rounded-full flex-shrink-0 text-5xl" variant='blue'>
            { "🗂️" }
          </Button>
          <span className="absolute left-28 text-black font-bold text-4xl">{corpus.title}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-blue-50">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{ corpus.title }</h4>
            <Separator className="my-4" />
            <p className="text-sm">
              { corpus.synthesis }
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CorpusNode;