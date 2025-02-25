import { ColorMode } from "@/app/types/color-mode";
import { NodeType } from "@/app/types/graph";


export const NodeTypeColorMapping: Record<NodeType, ColorMode> = {
  [NodeType.Corpus]: 'blue',
  [NodeType.Answer]: 'gray',
  [NodeType.QA]: 'green',
  [NodeType.Block]: 'yellow',
  [NodeType.Concept]: 'slate',
  [NodeType.Document]: 'rose',
  [NodeType.Exercise]: 'red',
  [NodeType.ROMECompetency]: 'orange',
  [NodeType.RNCPCompetency]: 'emerald'
};
