import { Edge_, Node_ } from "../types/graph";
import { remark } from 'remark';
import strip from 'strip-markdown';


export const extractPlainText = async (markdownText: string) => {
  const result = await remark().use(strip).process(markdownText);
  return result.toString();
};


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


export function cleanMarkdownLinks(markdown: string): string {
  // Step 1: Remove markdown links whose labels are not numeric
  markdown = markdown.replace(/\[\[(.+?)\]\]\([^\)]+\)/g, (match, label) => {
    return isNaN(Number(label)) ? '' : match;
  });

  // Step 2: Keep only the first occurrence of markdown links with numeric labels
  const seenLabels = new Set<string>();
  markdown = markdown.replace(/\[\[(\d+)\]\]\([^\)]+\)/g, (match, label) => {
    if (seenLabels.has(label)) {
      return ''; // remove duplicates
    } else {
      seenLabels.add(label);
      return match; // keep first occurrence
    }
  });

  // Step 3: Clean up extra spaces (only spaces, no tabs or newlines)
  markdown = markdown.replace(/ {2,}/g, ' ').trim();

  return markdown;
}