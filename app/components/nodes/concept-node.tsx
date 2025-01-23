"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { Concept } from "../../types/graph";

const ConceptNode: React.FC<{ concept: Concept }> = ({ concept }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-16 h-16   p-0 rounded-full flex-shrink-0 text-3xl" variant='amber'>
            { concept.emoji }
          </Button>
          <span className="absolute left-20 text-black font-semibold text-2xl">{ concept.label }</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-amber-50">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{ concept.label }</h4>
            <Separator className="my-4" />
            <p className="text-sm">
              { concept.definition }
            </p>
            { concept.image_url && (
              <div className="w-4/5 mx-auto">
                <AspectRatio ratio={ 16 / 9 }>
                  <Image
                    src={ concept.image_url }
                    alt={ concept.label }
                    layout="responsive"
                    width={ 100 } // Placeholder value
                    height={ 100 } // Placeholder value
                    className='rounded-md object-cover'
                  />
                </AspectRatio>

              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ConceptNode;