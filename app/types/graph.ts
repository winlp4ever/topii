export enum NodeType {
  Document = 'doc',
  Concept = 'concept',
  Corpus = 'corpus',
  QA = 'qa',
  Exercise = 'exercise',
  Block = 'block',
  Answer = 'answer',
  ROMECompetency = 'rome_competency',
  RNCPCompetency = 'rncp_competency',
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
  short_summary: string | null;
  synthesis: string | null;
  description: string | null;
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
  title: string | null;
  short_summary: string | null;
  long_summary: string | null;
  doc_id: string | null;
  corpus_id: string | null;
}

export interface Answer {
  id: string;
  text: string;
  sources: Block[];
}

export interface ROMECompetency {
  id: string;
  micro_competency: string;
  macro_competency: string;
  code_arborescence: string;
}

export interface RNCPCompetency {
  id: string;
  competency: string;
}

export interface Node_ {
  id: string;
  type: NodeType;
  doc?: Doc;
  concept?: Concept;
  qa?: QA;
  corpus?: Corpus;
  exercise?: Exercise;
  block?: Block;
  answer?: Answer;
  rome_competency?: ROMECompetency;
  rncp_competency?: RNCPCompetency;
  x?: number;
  y?: number;
  score?: number;
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