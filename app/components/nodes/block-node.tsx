"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";

import { Block } from "../../types/graph";

// Define the CorpusNode component as an arrow function with typed props
const BlockNode: React.FC<{ block: Block }> = ({ block }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-16 h-16 p-0 rounded-full flex-shrink-0 text-3xl" variant='indigo'>
            { "📑" }
          </Button>
          <span className="absolute left-20 text-black text-xl w-40">
            { block.title ? block.title: block.text.substring(0, 50) }
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-indigo-50 border-indigo-600">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            {
              block.title &&
              <>
              <h4 className="text-sm font-semibold">{ block.title }</h4>
              <Separator className="my-4" />
              </>
            }
            <p className="text-sm">
              { block.text }
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default BlockNode;