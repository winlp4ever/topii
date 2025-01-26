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

import { Doc } from "../../types/graph";
import MarkdownView from "../markdown-view";
import { Card, CardContent } from "@/components/ui/card";


export const DocView: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <div>
      <Card className='w-full'>
        <CardContent className="p-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{doc.title}</h1>
          <span className='text-accent-foreground text-sm'>{doc.short_summary}</span>
          <Separator className="my-4" />
          <MarkdownView content={doc.long_summary ? doc.long_summary: ""} />
        </CardContent>
      </Card>
    </div>
  );
}


// Define the ConceptNode component as an arrow function with typed props
const DocNode: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-24 h-24 p-0 rounded-full flex-shrink-0 text-5xl" variant='purple'>
            { "📝" }
          </Button>
          <span className="absolute left-28 text-black font-semibold text-2xl">{ doc.title }</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{ doc.title }</DialogTitle>
          <DialogDescription>
            { doc.short_summary }
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="prose">
          <MarkdownView content={doc.long_summary ? doc.long_summary: ""} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DocNode;