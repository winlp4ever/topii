interface Node_ {
  id: string;
  type: string; // 'qa', 'concept', 'block', etc.
  data?: any;
}

interface Edge_ {
  id: string;
  source: string;
  target: string;
  category?: string | null;
  score?: number | null;
  description?: string | null;
}

interface StructNode_ extends Node_ {
  type: 'StructNode_';
  data: {
    groupedType: string;
    originalNodeId: string;
  };
}

interface Graph {
  nodes: Node_[];
  edges: Edge_[];
}

function createStructNodesBFS(originalNodes: Node_[], originalEdges: Edge_[]): Graph {
  const nodesMap: Map<string, Node_> = new Map(originalNodes.map(node => [node.id, node]));
  const edgesMap: Map<string, Edge_[]> = new Map();

  // Build adjacency list
  originalEdges.forEach(edge => {
    if (!edgesMap.has(edge.source)) edgesMap.set(edge.source, []);
    if (!edgesMap.has(edge.target)) edgesMap.set(edge.target, []);
    edgesMap.get(edge.source)!.push(edge);
    edgesMap.get(edge.target)!.push(edge);
  });

  // Build edge lookup map for quick attribute retrieval
  const edgeLookup: Map<string, Edge_> = new Map();
  originalEdges.forEach(edge => {
    edgeLookup.set(`${edge.source}__${edge.target}`, edge);
    edgeLookup.set(`${edge.target}__${edge.source}`, edge); // both directions
  });

  const visited: Set<string> = new Set();
  const newNodes: Node_[] = [...originalNodes];
  const newEdges: Edge_[] = [];

  const queue: string[] = [];

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
      const structNode: StructNode_ = {
        id: structNodeId,
        type: 'StructNode_',
        data: {
          groupedType: type,
          originalNodeId: currentNodeId,
        },
      };

      newNodes.push(structNode);

      // Connect current node to struct node (no original attributes here)
      newEdges.push({
        id: `${currentNodeId}__${structNodeId}`,
        source: currentNodeId,
        target: structNodeId,
        category: null,
        score: null,
        description: `Struct edge from ${currentNodeId} to ${structNodeId}`,
      });

      groupNodes.forEach(node => {
        // Quickly retrieve original edge attributes using edgeLookup map
        const originalEdge = edgeLookup.get(`${currentNodeId}__${node.id}`);

        newEdges.push({
          id: `${structNodeId}__${node.id}`,
          source: structNodeId,
          target: node.id,
          category: originalEdge?.category ?? null,
          score: originalEdge?.score ?? null,
          description: originalEdge?.description ?? null,
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

// Example usage:
const originalNodes: Node_[] = [
  { id: '1', type: 'concept' },
  { id: '2', type: 'qa' },
  { id: '3', type: 'qa' },
  { id: '4', type: 'block' },
  { id: '5', type: 'concept' },
  { id: '6', type: 'block' },
  { id: '7', type: 'qa' },
];

const originalEdges: Edge_[] = [
  { id: '1__2', source: '1', target: '2', category: 'cat1', score: 0.9, description: 'Edge 1-2' },
  { id: '1__3', source: '1', target: '3', category: 'cat2', score: 0.8, description: 'Edge 1-3' },
  { id: '1__4', source: '1', target: '4', category: 'cat3', score: 0.7, description: 'Edge 1-4' },
  { id: '1__5', source: '1', target: '5', category: 'cat4', score: 0.6, description: 'Edge 1-5' },
  { id: '4__6', source: '4', target: '6', category: 'cat5', score: 0.5, description: 'Edge 4-6' },
  { id: '4__7', source: '4', target: '7', category: 'cat6', score: 0.4, description: 'Edge 4-7' },
];

const newGraph = createStructNodesBFS(originalNodes, originalEdges);

console.log("Nodes:", JSON.stringify(newGraph.nodes, null, 2));
console.log("Edges:", JSON.stringify(newGraph.edges, null, 2));