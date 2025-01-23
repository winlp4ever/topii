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

// Define the QANode component as an arrow function with typed props
const QANode: React.FC<{ qa: QA }> = ({ qa }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-20 h-20 p-0 rounded-full flex-shrink-0 text-3xl" variant='green'>
            { "❓" }
          </Button>
          <span className="absolute left-24 text-black text-xl font-bold">{qa.question}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 shadow-none bg-transparent border-none">
        <Carousel className="w-full max-w-xs text-center">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card className='bg-green-50'>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-lg font-semibold">{ qa.question }</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card className='bg-green-50'>
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