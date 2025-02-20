"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { RNCPCompetency } from "../../types/graph";
import { BookA } from "lucide-react";
import { trimText } from "../utils";

const RncpNode: React.FC<{ rncp_competency: RNCPCompetency, score: number | undefined }> = ({ rncp_competency, score }) => {
  const label = trimText(rncp_competency.competency, 30)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
          <Button className="absolute -left-4 ml-4 px-4 py-6 rounded-l-full rounded-r-md text-xl" variant='orange'>
            <span className="flex items-center justify-center w-4 h-4 bg-orange-500 rounded-full"></span>
            <span>🛠️</span>
            <span className="">{ "RNCP : " + label }</span>
            {
              score !== undefined ? (
                <span className="ml-2 text-lg font-semibold p-1 bg-orange-50 rounded-xl">{ score + "/10" }</span>
              ) : null
            }
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-orange-50 border-orange-600 p-0">
        <div className='bg-orange-100 rounded-t-lg px-4 py-2 text-accent-foreground flex space-x-2 items-center'>
          <BookA className='w-4 h-4 text-accent-foreground' />
          <span className='text-sm font-semibold'>{ "RNCP Competency" }</span>
          {
            score !== undefined ? (
              <span className="ml-2 text-xs font-semibold p-1 bg-orange-50 rounded-xl">{ score + "/10" }</span>
            ) : null
          }
        </div>
        <div className="flex justify-between space-x-4 px-4 py-2">
          <div className="space-y-1">
            <p className="text-sm">
              { rncp_competency.competency }
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default RncpNode;