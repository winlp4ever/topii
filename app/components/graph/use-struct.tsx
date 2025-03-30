import { ExpandableNode, GraphData } from "@/app/types/graph";
import { Edge, useReactFlow } from "@xyflow/react";
import { createStructNodesBFS } from "@/app/lib/graph/struct";
import { useEffect } from "react";


export function createStruct(
  data: GraphData
): { nodes: ExpandableNode[]; edges: Edge[] } {
  // createStructNodesBFS is a function that takes in nodes and edges and returns a GraphData object
  const { nodes, edges } = createStructNodesBFS(data.nodes, data.edges);
  console.log('createStructNodesBFS', nodes, edges);
  const newNodes = nodes.map(node => ({
    id: node.id,
    position: { x: node.x ? node.x : 0, y: node.y ? node.y : 0 },
    data: {
      expanded: false,
      ...node,
    },
  }));

  const newEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    data: {
      label: edge.score ? `${Math.round(edge.score * 10)}/10`: undefined,
      description: edge.description,
    },
    style: { stroke: edge.category === 'source' ? '#3b82f6': '#f43f5e', strokeWidth: 1 },
    type: 'dashed',
  }));

  return { nodes: newNodes, edges: newEdges };
}


export function useStruct(data: GraphData): void {
  const { setNodes, setEdges } = useReactFlow();
  useEffect(() => {
    console.log('Calling createStruct');
    const {nodes, edges} = createStruct(data);
    setNodes(nodes);
    setEdges(edges);
  }, [data, setEdges, setNodes]);
}