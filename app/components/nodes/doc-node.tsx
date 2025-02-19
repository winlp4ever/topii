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
import { useAppStore } from "@/app/store";
import { trimText } from "../utils";


export const DocView: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <div>
      <Card className='w-full h-full'>
        <CardContent className="p-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{doc.title}</h1>
          <span className='text-accent-foreground text-sm'>{doc.short_summary}</span>
          <Separator className="my-4" />
          <MarkdownView content={doc.synthesis_ ? doc.synthesis_: ""} />
        </CardContent>
      </Card>
    </div>
  );
}


// Define the ConceptNode component as an arrow function with typed props
const DocNode: React.FC<{ doc: Doc }> = ({ doc }) => {
  const focusNode = useAppStore((state) => state.focusNode);

  let title;
  if (doc.title === null) {
    title = "Untitled";
  }
  else {
    title = trimText(doc.title, 50);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="relative flex items-center bg-transparent"
        >
          <div className="relative flex items-center bg-transparent">
            <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
            <Button
              className="absolute -left-4 ml-4 px-4 py-6 rounded-l-full rounded-r-md text-2xl space-x-2"
              variant='purple'
              onContextMenu={ (e) => { focusNode(`doc_${doc.id}`); e.preventDefault(); } }
            >
              <span>{ "📔" }</span>
              <span className="">{ title }</span>
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-full overflow-y-scroll">
        <div className='w-full h-full'>
          <DialogHeader>
            <DialogTitle>{ doc.title }</DialogTitle>
            <DialogDescription>
              { doc.short_summary }
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="prose">
            <MarkdownView content={doc.synthesis_ ? doc.synthesis_: ""} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DocNode;
