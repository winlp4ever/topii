import { LLMEnum } from '../types/ai';
import { DataState } from '../types/data-state';


export async function resolveClientId(id: string): Promise<number> {
  const cid = id.split('_')[1];
  const url = new URL(`${process.env.API_URL}/clientid`);
  const params = new URLSearchParams({ corpus_id: cid });
  url.search = params.toString();

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to resolve corpus ID: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.client_id;
}


async function fetchStreamedData(
  url: string | URL,
  onData: (data: DataState) => void,
  method: string = 'GET',
  body: BodyInit | null = null
): Promise<void> {
  const headers: HeadersInit = {};

  // Conditionally add the Content-Type header if the body is not null
  if (body !== null) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url.toString(), {
    method,
    body,
    headers,
    mode: 'cors',
    cache: 'no-cache',
  });

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


export async function fetchStreamedGraph(
  clientId: number,
  nodeId: string,
  onData: (data: DataState) => void
): Promise<void> {
  const url = new URL(`${process.env.API_URL}/recommend`);
  const params: { [key: string]: string } = { client_id: clientId.toString(), node_id: nodeId };
  // Append query parameters to the URL
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key] as string));
  console.log('fetching streamed graph data from', url.toString());
  await fetchStreamedData(url, onData);
}


export async function queryGraph(
  clientId: number,
  corpusId: number,
  query: string,
  onData: (data: DataState) => void,
  modelChoice: LLMEnum
): Promise<void> {
  console.log('querying graph data');
  console.log(`model choice: ${modelChoice}`);
  const url = new URL(`${process.env.API_URL}/query`);

  const requestBody = {
    client_id: clientId,
    corpus_id: corpusId,
    query,
    llm_model: modelChoice
  }
  console.log('querying graph data with:', requestBody);
  await fetchStreamedData(url, onData, 'POST', JSON.stringify(requestBody));
}