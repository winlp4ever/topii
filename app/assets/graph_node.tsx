"use client";
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
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { Node_, NodeType, Doc, Concept, Corpus } from "../types/graph";
import QANode from "./qa-node";


const CorpusNode: React.FC<{ corpus: Corpus }> = ({ corpus }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-10 h-10 p-0 rounded-full flex-shrink-0" variant='purple'>
            {"🗂️"}
          </Button>
          <span className="absolute left-12 text-black font-bold">{corpus.title}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{ corpus.title }</h4>
            <Separator className="my-4" />
            <p className="text-sm">
              { corpus.synthesis }
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Define the ConceptNode component as an arrow function with typed props
const DocNode: React.FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-10 h-10 p-0 rounded-full flex-shrink-0" variant='blue'>
            {"📄"}
          </Button>
          <span className="absolute left-12 text-black font-bold">{ doc.title }</span>
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

const ConceptNode: React.FC<{ concept: Concept }> = ({ concept }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-8 h-8 p-0 rounded-full flex-shrink-0" variant='amber'></Button>
          <span className="absolute left-10 text-black">{concept.label}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
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

type GraphNodeProps = {
  node: Node_
};

// Define the GraphNode component as an arrow function with typed props
const GraphNode: React.FC<GraphNodeProps> = ({ node }) => {
  if (node.type === NodeType.Concept && node.concept) {
    return <ConceptNode concept={ node.concept } />;
  } else if (node.type === NodeType.Document && node.doc) {
    return <DocNode doc={ node.doc } />;
  } else if (node.type === NodeType.Corpus && node.corpus) {
    return <CorpusNode corpus={ node.corpus } />;
  } else if (node.type === NodeType.QA && node.qa) {
    return <QANode qa={ node.qa } />;
  }
};

export default GraphNode;
