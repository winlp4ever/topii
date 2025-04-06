import { Node } from '@xyflow/react';

export enum NodeType {
  Document = 'doc',
  Concept = 'kernel_concept',
  Corpus = 'corpus',
  QA = 'qa',
  Exercise = 'exercise',
  Block = 'block',
  Answer = 'answer',
  ROMECompetency = 'rome_competency',
  RNCPCompetency = 'rncp_competency',
  Text = 'text',
  Struct = 'struct'
}

export interface StructData {
  originalId: string;
  type: NodeType;
}

export interface Text {
  id: string;
  text: string;
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
  search_query: string[];
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
  text?: Text;
  doc?: Doc;
  concept?: Concept;
  qa?: QA;
  corpus?: Corpus;
  exercise?: Exercise;
  block?: Block;
  answer?: Answer;
  rome_competency?: ROMECompetency;
  rncp_competency?: RNCPCompetency;
  struct?: StructData;
  x?: number;
  y?: number;
  score?: number;
  adjacentNodeIds?: string[];
}

export interface Edge_ {
  id: string;
  source: string;
  target: string;
  score: number | null;
  description: string | null;
  category: string | null;
}

export interface GraphData {
  nodes: Node_[];
  edges: Edge_[];
}

export interface NodeData extends Node_ {
  expanded?: boolean;
  expandable?: boolean;
  height?: number;
  setHeight?: boolean;
  lockAspectRatio?: boolean;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  [key: string]: unknown;
}

export type ExpandableNode = Node<NodeData>;