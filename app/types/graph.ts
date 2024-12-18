export enum NodeType {
  Document = 'document',
  Concept = 'concept',
  Corpus = 'corpus',
  QA = 'qa',
  Exercise = 'exercise',
}

export interface Doc {
  id: number;
  title: string | null;
  shortSummary: string | null;
  summary: string | null;
}

export interface Concept {
  id: string;
  label: string;
  definition: string;
}

export interface Node_ {
  id: string;
  type: NodeType;
  doc?: Doc;
  concept?: Concept;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface GraphData {
  nodes: Node_[];
  edges: Edge[];
}