"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from 'react-markdown';

import { Doc } from "../../types/graph";


// Define the ConceptNode component as an arrow function with typed props
const DocNode: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-24 h-24 p-0 rounded-full flex-shrink-0 text-5xl" variant='purple'>
            { "📝" }
          </Button>
          <span className="absolute left-28 text-black font-bold text-2xl">{ doc.title }</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{ doc.title }</DialogTitle>
          <DialogDescription>
            { doc.short_summary }
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="prose">
          <ReactMarkdown>{ doc.long_summary }</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DocNode;