import { ColorMode } from "@/app/types/color-mode";
import { NodeType } from "@/app/types/graph";
import { FolderOpen, Sparkles, FileQuestion, Bike, Blocks, ListChecks, FileText, Key, Text } from "lucide-react";


export const NodeTypeColorMapping: Record<NodeType, ColorMode> = {
  [NodeType.Corpus]: 'blue',
  [NodeType.Answer]: 'slate',
  [NodeType.QA]: 'green',
  [NodeType.Block]: 'yellow',
  [NodeType.Concept]: 'slate',
  [NodeType.Document]: 'violet',
  [NodeType.Exercise]: 'red',
  [NodeType.ROMECompetency]: 'orange',
  [NodeType.RNCPCompetency]: 'teal',
  [NodeType.Text]: 'stone',
  [NodeType.Struct]: 'rose',
};


export const NodeTypeIconMapping: Record<NodeType, React.FC> = {
  [NodeType.Corpus]: () => <FolderOpen strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.Answer]: () => <Sparkles strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.QA]: () => <FileQuestion strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.Block]: () => <Blocks strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.Concept]: () => <Key strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.Document]: () => <FileText strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.Exercise]: () => <ListChecks strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.ROMECompetency]: () => <Blocks strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.RNCPCompetency]: () => <Bike strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.Text]: () => <Text strokeWidth={1.5} className='w-4 h-4' />,
  [NodeType.Struct]: () => <FileText strokeWidth={1.5} className='w-4 h-4' />,
};
