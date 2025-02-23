import { Edge_, Node_ } from "../types/graph";

export const trimText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};


export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the array to avoid mutating the original array
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices i and j
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}


export function capitalize(text: string): string {
  if (!text) return text; // Handle empty string or null/undefined
  return text.charAt(0).toUpperCase() + text.slice(1);
}


export function filterSourceNodes(root_id: string, nodes: Node_[], edges: Edge_[]): Node_[] {
  // Get all the source nodes connected to the root node
  const sourceEdges = edges.filter(edge => edge.target === root_id && edge.category === 'source');
  const nodeSet = new Set<string>();
  sourceEdges.forEach(edge => nodeSet.add(edge.source));
  const sourceNodes = nodes.filter(node => nodeSet.has(node.id));
  return sourceNodes;
}