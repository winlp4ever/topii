import { GraphData } from '../types/graph';
import { mockGraphData } from '../mocks/handlers';


function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export async function fetchStreamedGraph(nodeId: string): Promise<GraphData> {
  const url = new URL(`${process.env.API_URL}/recommend`);
  const params: { [key: string]: string } = { node_id: nodeId };
  // Append query parameters to the URL
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key] as string));
  console.log('fetching streamed graph data from', url.toString());
  const response = await fetch(url.toString());
  if (!response.body) {
    throw new Error("ReadableStream not supported in this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let latestGraph: GraphData | null = null;

  // Read the stream chunk by chunk:
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode the chunk and accumulate in our buffer
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');

    // Process all complete lines (but keep the last partial chunk if any)
    buffer = lines.pop() || '';
    for (const line of lines) {
      if (line.trim()) {
        try {
          // Each streamed chunk is a JSON string representing part (or the whole)
          // of your graph data
          const data: GraphData = JSON.parse(line);
          // For example purposes, here we simply keep the latest streamed GraphData.
          // Alternatively, you could merge results if your backend streams partial updates.
          latestGraph = data;
        } catch (err) {
          console.error("Error parsing streamed line:", err);
          // Optionally handle parsing errors
        }
      }
    }
  }

  // In case there is any remaining data in the buffer:
  if (buffer.trim()) {
    try {
      const data: GraphData = JSON.parse(buffer);
      latestGraph = data;
    } catch (err) {
      console.error("Error parsing final streamed data:", err);
    }
  }

  if (!latestGraph) {
    throw new Error("No graph data received from stream.");
  }
  return latestGraph;
}


export async function queryGraph(query: string): Promise<GraphData> {
  console.log('querying graph data');
  if (process.env.NODE_ENV === 'development') {
    console.log('using mock data');
    await sleep(1000);
    return mockGraphData;
  }

  const response = await fetch(`/api/graph?q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch graph data');
  }
  return response.json();
}