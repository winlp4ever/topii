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
  return (
    <div>
      <Card className='w-full h-full'>
        <CardContent className="p-4">
          <h4 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{ `Main corpus` }</h4>
          <Separator className="my-4" />
          <MarkdownView content={ corpus.description ? corpus.description: "" } />
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
            className="absolute -left-4 ml-4 px-6 py-8 rounded-l-full rounded-r-md text-3xl space-x-2"
            variant='blue'
            onContextMenu={ (e) => { focusNode(`corpus_${corpus.id}`); e.preventDefault(); } }
          >
            <span>{ "🗂️" }</span>
            <span className="">{ "Main corpus" }</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-full">
        <div className='w-full h-full overflow-scroll'>
          <DialogHeader>
            <DialogTitle>{ `Corpus ${corpus.id}` }</DialogTitle>
            <DialogDescription>
              { corpus.description }
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="prose">
            <MarkdownView content={ corpus.description ? corpus.description: "" } />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CorpusNode;