import { ColorMode } from "@/app/types/color-mode";
import { NodeType } from "@/app/types/graph";


export const NodeTypeColorMapping: Record<NodeType, ColorMode> = {
  [NodeType.Corpus]: 'blue',
  [NodeType.Answer]: 'slate',
  [NodeType.QA]: 'green',
  [NodeType.Block]: 'yellow',
  [NodeType.Concept]: 'slate',
  [NodeType.Document]: 'violet',
  [NodeType.Exercise]: 'red',
  [NodeType.ROMECompetency]: 'orange',
  [NodeType.RNCPCompetency]: 'teal'
};
