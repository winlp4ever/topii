"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";

import { ROMECompetency } from "../../types/graph";
import { BookA } from "lucide-react";
import { trimText } from "../utils";

const RomeNode: React.FC<{ rome_competency: ROMECompetency, score: number | undefined }> = ({ rome_competency, score }) => {
  const label = trimText(rome_competency.micro_competency, 30)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
          <Button className="absolute -left-4 ml-4 px-4 py-6 rounded-l-full rounded-r-md text-xl" variant='lime'>
            <span className="flex items-center justify-center w-4 h-4 bg-lime-500 rounded-full"></span>
            <span>🚀</span>
            <span className="">{ "ROME : " + label }</span>
            {
              score !== undefined ? (
                <span className="ml-2 text-lg font-semibold p-1 bg-lime-50 rounded-xl">{ score + "/10" }</span>
              ) : null
            }
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-lime-50 border-lime-600 p-0">
        <div className='bg-lime-100 rounded-t-lg px-4 py-2 text-accent-foreground flex space-x-2 items-center'>
          <BookA className='w-4 h-4 text-accent-foreground' />
          <span className='text-sm font-semibold'>{ "ROME Competency" }</span>
          {
            score !== undefined ? (
              <span className="ml-2 text-xs font-semibold p-1 bg-lime-50 rounded-xl">{ score + "/10" }</span>
            ) : null
          }
        </div>
        <div className="flex justify-between space-x-4 px-4 py-2">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{ rome_competency.macro_competency }</h4>
            <Separator className="my-4" />
            <p className="text-sm">
              { rome_competency.micro_competency }
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default RomeNode;