"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";


type GraphNodeProps = {
  label: string;
  definition: string;
};

// Define the GraphNode component as an arrow function with typed props
const GraphNode: React.FC<GraphNodeProps> = ({ label, definition }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{label}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{label}</h4>
            <Separator className="my-4" />
            <p className="text-sm">
              {definition}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
};

export default GraphNode;
