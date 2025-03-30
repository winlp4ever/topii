import { NodeType } from "@/app/types/graph";


export const TypeTabnameMapping: Record<NodeType, string> = {
  [NodeType.Block]: 'Source Texts',
  [NodeType.Answer]: 'Answers',
  [NodeType.QA]: 'Q&As',
  [NodeType.Document]: 'Sources',
  [NodeType.Exercise]: 'Activities',
  [NodeType.ROMECompetency]: 'ROME',
  [NodeType.RNCPCompetency]: 'RNCP',
  [NodeType.Concept]: 'Key Concepts',
  [NodeType.Corpus]: 'Corpora',
  [NodeType.Text]: "Texts",
  [NodeType.Struct]: "Structs",
};
