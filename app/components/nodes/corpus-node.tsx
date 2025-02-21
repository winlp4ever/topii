"use client";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { Corpus } from "../../types/graph";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MarkdownView from "../markdown-view";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/app/store";


export const CorpusView: React.FC<{ corpus: Corpus }> = ({ corpus }) => {
  const text = `# ${corpus.title}\n\n---\n\n${corpus.synthesis ? corpus.synthesis: ""}`;
  return (
    <div>
      <Card className='w-full h-full'>
        <CardContent className="p-4">
          <MarkdownView content={ text } />
        </CardContent>
      </Card>
    </div>
  );
}


// Define the CorpusNode component as an arrow function with typed props
const CorpusNode: React.FC<{ corpus: Corpus }> = ({ corpus }) => {
  const focusNode = useAppStore((state) => state.focusNode);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
          <Button
            className="absolute -left-4 ml-4 px-4 py-6 rounded-l-full rounded-r-md text-xl"
            variant='blue'
            onContextMenu={ (e) => { focusNode(`corpus_${corpus.id}`); e.preventDefault(); } }
          >
            <span className="flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full"></span>
            <span>{ "🗂️" }</span>
            <span className="">{ corpus.title }</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-full">
        <div className='w-full h-full overflow-scroll'>
          <DialogHeader>
            <DialogTitle>{ corpus.title }</DialogTitle>
            <DialogDescription>
              { corpus.short_summary }
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="prose">
            <MarkdownView content={ corpus.synthesis ? corpus.synthesis: "" } />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CorpusNode;