export enum NodeType {
  Document = 'document',
  Concept = 'concept',
  Corpus = 'corpus',
  QA = 'qa',
  Exercise = 'exercise',
  Block = 'block',
  Answer = 'answer',
}

export interface Doc {
  id: number;
  title: string | null;
  short_summary: string | null;
  long_summary: string | null;
  synthesis_: string | null;
}

export interface Corpus {
  id: number;
  title: string | null;
  synthesis: string | null;
}

export interface QA {
  id: string;
  question: string;
  answer: string;
}

export interface Concept {
  id: string;
  label: string;
  definition: string;
  image_url?: string;
  emoji: string;
}

export interface Exercise {
  id: string;
  question: string;
  answers: string[];
  distractors: string[];
  feedback: string;
}

export interface Block {
  id: string;
  text: string;
  title?: string;
  short_summary?: string;
  long_summary?: string;
  doc_id?: string;
  corpus_id?: string;
}

export interface Answer {
  id: string;
  text: string;
  sources: Block[];
}

export interface Node_ {
  id: string;
  type: NodeType;
  doc?: Doc;
  concept?: Concept;
  qa?: QA;
  corpus?: Corpus;
  x?: number;
  y?: number;
}

export interface Edge_ {
  id: string;
  source: string;
  target: string;
}

export interface GraphData {
  nodes: Node_[];
  edges: Edge_[];
}