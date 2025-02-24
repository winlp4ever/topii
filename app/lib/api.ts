import { DataState } from '../types/data-state';


async function fetchStreamedData(url: string | URL, onData: (data: DataState) => void): Promise<void> {
  const response = await fetch(url.toString());
  if (!response.body) {
    throw new Error("ReadableStream not supported in this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.trim()) {
        try {
          const data: DataState = JSON.parse(line);
          onData(data); // Call the callback with each piece of data
        } catch (err) {
          console.error("Error parsing streamed line:", err);
        }
      }
    }
  }

  if (buffer.trim()) {
    try {
      const data: DataState = JSON.parse(buffer);
      onData(data);
    } catch (err) {
      console.error("Error parsing final streamed data:", err);
    }
  }
}


export async function fetchStreamedGraph(nodeId: string, onData: (data: DataState) => void): Promise<void> {
  const url = new URL(`${process.env.API_URL}/recommend`);
  const params: { [key: string]: string } = { node_id: nodeId };
  // Append query parameters to the URL
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key] as string));
  console.log('fetching streamed graph data from', url.toString());
  await fetchStreamedData(url, onData);
}


export async function queryGraph(corpusId: number, query: string, onData: (data: DataState) => void): Promise<void> {
  console.log('querying graph data');
  const url = new URL(`${process.env.API_URL}/query`);
  const params = new URLSearchParams({
    corpus_id: corpusId.toString(),
    query: query,
  });

  url.search = params.toString();
  await fetchStreamedData(url, onData);
}