import { GraphData, NodeType } from "@/app/types/graph";
import { Edge, Node } from "@xyflow/react";
import GraphNode, { StructNode } from "./nodes/graph-node";
import { createStructNodesBFS } from "@/app/lib/graph/struct";


export function createStruct(
  data: GraphData
): { nodes: Node[]; edges: Edge[] } {
  // createStructNodesBFS is a function that takes in nodes and edges and returns a GraphData object
  const { nodes, edges } = createStructNodesBFS(data.nodes, data.edges);
  const newNodes = nodes.map((node, idx) => ({
    id: node.id,
    position: { x: node.x ? node.x : 0, y: node.y ? node.y : 0 },
    data: { label: node.type !== NodeType.Struct ? <GraphNode node={node} isRoot={idx === 0} />: <StructNode structNode={node} /> },
  }));

  const newEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    data: {
      label: edge.score !== null ? `${Math.round(edge.score * 10)}/10`: undefined,
      description: edge.description
    },
    style: { stroke: edge.category === 'source' ? '#3b82f6': '#f43f5e', strokeWidth: 1 },
    type: 'dashed',
  }));

  return { nodes: newNodes, edges: newEdges };
}