"use client";
import { Tickets, BookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Node_, NodeType, Doc, Concept } from "../types/graph";


type GraphNodeProps = {
  node: Node_
};

const DocNode: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <BookText />
          <span className="text-lg">{ doc.title }</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{ doc.title }</DialogTitle>
          <DialogDescription>
            { doc.shortSummary }
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <DialogDescription>
          { doc.summary }
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

const ConceptNode: React.FC<{ concept: Concept }> = ({ concept }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Tickets />
          <span>{ concept.label }</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between space-x-4">
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
  )
}
// Define the GraphNode component as an arrow function with typed props
const GraphNode: React.FC<GraphNodeProps> = ({ node }) => {
  if (node.type === NodeType.Concept && node.concept) {
    return <ConceptNode concept={ node.concept } />;
  } else if (node.type === NodeType.Document && node.doc) {
    return <DocNode doc={ node.doc } />;
  }
};

export default GraphNode;
