"use client";
import { Node_, NodeType } from "../../types/graph";
import QANode from "./qa-node";
import ConceptNode from "./concept-node";
import CorpusNode from "./corpus-node";
import DocNode from "./doc-node";
import BlockNode from "./block-node";
import AnswerNode from "./answer-node";
import RomeNode from "./rome-node";
import RncpNode from "./rncp-node";


type GraphNodeProps = {
  node: Node_;
  onNodeRightClick?: (nodeId: string) => void;
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
  } else if (node.type === NodeType.Block && node.block) {
    return <BlockNode block={ node.block } />;
  } else if (node.type === NodeType.Answer && node.answer) {
    return <AnswerNode answer={ node.answer } />;
  } else if (node.type === NodeType.ROMECompetency && node.rome_competency) {
    return <RomeNode rome_competency={ node.rome_competency } score={ node.score } />;
  } else if (node.type === NodeType.RNCPCompetency && node.rncp_competency) {
    return <RncpNode rncp_competency={ node.rncp_competency } score={ node.score }/>;
  }
};

export default GraphNode;
