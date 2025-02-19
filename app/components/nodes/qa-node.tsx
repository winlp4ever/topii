import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { QA } from "../../types/graph";
import { trimText } from "../utils";

// Define the QANode component as an arrow function with typed props
const QANode: React.FC<{ qa: QA }> = ({ qa }) => {
  const question = trimText(qa.question, 50);
  return (
    <Popover>
      <PopoverTrigger asChild>
      <div className="relative flex items-center bg-transparent">
        <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
          <Button
            className="absolute -left-4 ml-4 px-4 py-6 rounded-l-full rounded-r-md text-xl space-x-2"
            variant='green'
          >
            <span>{ "❓" }</span>
            <span className="">{ question }</span>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 shadow-none bg-transparent border-none">
        <Carousel className="w-full max-w-xs text-center">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card className='bg-green-50 border-green-600'>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-lg font-semibold">{ qa.question }</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card className='bg-green-50 border-green-600'>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="">{ qa.answer }</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="bg-green-50" />
          <CarouselNext className='bg-green-50' />
        </Carousel>
      </PopoverContent>
    </Popover>
  )
};

export default QANode;