import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchStreamedGraph, queryGraph } from './lib/api';
import {
  GraphData,
  Node_,
} from './types/graph';

export type Stage = 'local' | 'dev' | 'preprod' | 'prod' | 'test';
export type InputType = 'query' | 'nodeId';
export type LoadingStatus = 'loading' | 'loaded' | 'idle' | 'error';

export interface AppState {
  stage: Stage
  corpusId: string | null
  inputType: InputType
  input: string | null
  graph: GraphData | null
  loadingStatus: LoadingStatus
  response: Node_ | null

  // Synchronous actions
  setStage: (stage: Stage) => void
  setCorpusId: (id: string) => void
  setInputType: (type: InputType) => void
  setInput: (input: string) => void
  setGraph: (g: GraphData) => void
  setLoadingStatus: (status: LoadingStatus) => void
  setResponse: (node: Node_ | null) => void

  // Async/thunk-like actions
  loadCorpus: (id: string) => Promise<void>
  searchQuery: (query: string) => Promise<void>
  focusNode: (nodeId: string) => Promise<void>
}

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    stage: 'local',
    corpusId: null,
    inputType: 'nodeId',
    input: '',
    graph: null,
    loadingStatus: 'idle',
    response: null,

    setStage: (stage: Stage) => set({ stage }),
    setCorpusId: (id: string) => set({ corpusId: id }),
    setInputType: (type: InputType) => set({ inputType: type }),
    setInput: (val: string | null) => set({ input: val }),
    setGraph: (g: GraphData) => set({ graph: g }),
    setLoadingStatus: (status: LoadingStatus) => set({ loadingStatus: status }),
    setResponse: (node: Node_) => set({ response: node }),

    // ─────────────────────────────────────────────────────────
    // loadCorpus: gets the corpus node's graph from the backend
    // ─────────────────────────────────────────────────────────
    loadCorpus: async (id: string) => {
      set({ loadingStatus: 'loading' });
      try {
        // Use the streaming endpoint: pass node_id as the corpus id string
        console.log('loading corpus:', id);
        const graphData: GraphData = await fetchStreamedGraph(id);
        let responseNode: Node_ | null = null;
        if (graphData.nodes && graphData.nodes.length > 0) {
          responseNode = graphData.nodes[0];
        }
        console.log(graphData);
        set({
          graph: graphData,
          loadingStatus: 'loaded',
          corpusId: id,
          input: String(id),
          inputType: 'nodeId',
          response: responseNode,
        });
      } catch (err) {
        console.error('Error loading corpus:', err);
        set({ loadingStatus: 'error' });
      }
    },

    // ─────────────────────────────────────────────────────────
    // searchQuery: calls query(queryString) → returns GraphData
    // ─────────────────────────────────────────────────────────
    searchQuery: async (queryStr: string) => {
      set({ loadingStatus: 'loading' })
      try {
        const data: GraphData = await queryGraph(queryStr)
        let responseNode: Node_ | null = null
        if (data.nodes.length > 0) {
          responseNode = data.nodes[0]
        }

        // Suppose we put the new graph in state, and any specific
        // "answer" node you want might or might not come back from the server.
        // For now, assume you handle it in "response" if needed.
        set({
          graph: data,
          loadingStatus: 'loaded',
          input: queryStr,
          inputType: 'query',
          response: responseNode,
        })
      } catch (err) {
        console.error('Error searching query:', err)
        set({ loadingStatus: 'error' })
      }
    },

    // ─────────────────────────────────────────────────────────
    // focusNode: calls get_node(nodeId) → returns subgraph around that node
    // ─────────────────────────────────────────────────────────
    focusNode: async (nodeId: string) => {
      console.log('focusing node:', nodeId);
      set({ loadingStatus: 'loading' });
      try {
        const graphData: GraphData = await fetchStreamedGraph(nodeId);
        let responseNode: Node_ | null = null;
        if (graphData.nodes && graphData.nodes.length > 0) {
          responseNode = graphData.nodes[0];
        }
        set({
          graph: graphData,
          loadingStatus: 'loaded',
          input: nodeId,
          inputType: 'nodeId',
          response: responseNode,
        });
      } catch (err) {
        console.error('Error focusing node:', err);
        set({ loadingStatus: 'error' });
      }
    },
  }))
)