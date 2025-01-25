import { GraphData } from '../types/graph';
import { mockGraphData } from '../mocks/handlers';


export async function getNode(nodeId: string): Promise<GraphData> {
  console.log('fetching graph data');
  if (process.env.NODE_ENV === 'development') {
    console.log('using mock data');
    return mockGraphData;
  }

  const response = await fetch(`/api/graph/${nodeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch graph data');
  }
  return response.json();
}

export async function queryGraph(query: string): Promise<GraphData> {
  console.log('querying graph data');
  if (process.env.NODE_ENV === 'development') {
    console.log('using mock data');
    return mockGraphData;
  }

  const response = await fetch(`/api/graph?q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch graph data');
  }
  return response.json();
}