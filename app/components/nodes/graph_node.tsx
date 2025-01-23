"use client";
import { Node_, NodeType } from "../../types/graph";
import QANode from "./qa-node";
import ConceptNode from "./concept-node";
import CorpusNode from "./corpus-node";
import DocNode from "./doc-node";


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
