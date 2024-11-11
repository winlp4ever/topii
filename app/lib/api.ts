import { GraphData } from '../types/graph';


export async function fetchGraph(nodeId: string): Promise<GraphData> {
  const response = await fetch(`/api/graph/${nodeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch graph data');
  }
  return response.json();
}