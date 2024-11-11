export interface Node {
  id: string;
  name: string;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}