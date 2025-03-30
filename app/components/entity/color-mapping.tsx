import { ColorMode } from "@/app/types/color-mode";
import { NodeType } from "@/app/types/graph";
import { FolderOpen, Sparkles, Blocks, FileText, Key, Text, Puzzle, MessageCircleQuestion, TextSelect, BriefcaseBusiness } from "lucide-react";


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
  [NodeType.Corpus]: () => <FolderOpen className='w-4 h-4 flex-shrink-0' />,
  [NodeType.Answer]: () => <Sparkles className='w-4 h-4 flex-shrink-0' />,
  [NodeType.QA]: () => <MessageCircleQuestion className='w-4 h-4 flex-shrink-0' />,
  [NodeType.Block]: () => <TextSelect className='w-4 h-4 flex-shrink-0' />,
  [NodeType.Concept]: () => <Key className='w-4 h-4 flex-shrink-0' />,
  [NodeType.Document]: () => <FileText className='w-4 h-4 flex-shrink-0' />,
  [NodeType.Exercise]: () => <Puzzle className='w-4 h-4 flex-shrink-0' />,
  [NodeType.ROMECompetency]: () => <Blocks className='w-4 h-4 flex-shrink-0' />,
  [NodeType.RNCPCompetency]: () => <BriefcaseBusiness className='w-4 h-4 flex-shrink-0' />,
  [NodeType.Text]: () => <Text className='w-4 h-4 flex-shrink-0' />,
  [NodeType.Struct]: () => <FileText className='w-4 h-4 flex-shrink-0' />,
};
