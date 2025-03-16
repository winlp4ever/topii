import { Edge_, GraphData, Node_, NodeType } from "../../types/graph";


export function createStructNodesBFS(originalNodes: Node_[], originalEdges: Edge_[]): GraphData {
  const nodesMap: Map<string, Node_> = new Map(originalNodes.map(node => [node.id, node]));
  const edgesMap: Map<string, Edge_[]> = new Map();

  // Build adjacency list
  originalEdges.forEach(edge => {
    if (!edgesMap.has(edge.source)) edgesMap.set(edge.source, []);
    if (!edgesMap.has(edge.target)) edgesMap.set(edge.target, []);
    edgesMap.get(edge.source)!.push(edge);
    edgesMap.get(edge.target)!.push(edge);
  });

  const visited: Set<string> = new Set();
  const newNodes: Node_[] = [...originalNodes];
  const newEdges: Edge_[] = [];

  const queue: string[] = [];

  // Start BFS from the first node
  if (originalNodes.length === 0) {
    return { nodes: [], edges: [] };
  }

  queue.push(originalNodes[0].id);
  visited.add(originalNodes[0].id);

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;

    const connectedEdges = edgesMap.get(currentNodeId) || [];

    // Find connected nodes (excluding already visited nodes)
    const connectedNodeIds = new Set<string>();
    connectedEdges.forEach(edge => {
      const neighborId = edge.source === currentNodeId ? edge.target : edge.source;
      if (!visited.has(neighborId)) {
        connectedNodeIds.add(neighborId);
      }
    });

    const connectedNodes = Array.from(connectedNodeIds).map(id => nodesMap.get(id)!);

    // Group connected nodes by type
    const groups: Record<string, Node_[]> = {};
    connectedNodes.forEach(node => {
      if (!groups[node.type]) groups[node.type] = [];
      groups[node.type].push(node);
    });

    // For each group, create StructNode_ and re-point edges
    Object.entries(groups).forEach(([type, groupNodes]) => {
      const structNodeId = `${currentNodeId}_${type}`;
      const structNode: Node_ = {
        id: structNodeId,
        type: NodeType.Struct,
      };

      newNodes.push(structNode);

      // Connect current node to struct node
      newEdges.push({
        id: `${currentNodeId}__${structNodeId}`,
        source: currentNodeId,
        target: structNodeId,
        score: null,
        description: null,
        category: null,
      });

      groupNodes.forEach(node => {
        // Connect struct node to each node in the group
        newEdges.push({
          id: `${structNodeId}__${node.id}`,
          source: structNodeId,
          target: node.id,
          score: null,
          description: null,
          category: null,
        });

        // Enqueue node for further traversal if not visited
        if (!visited.has(node.id)) {
          visited.add(node.id);
          queue.push(node.id);
        }
      });
    });
  }

  return {
    nodes: newNodes,
    edges: newEdges,
  };
}
