import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getNode, queryGraph } from './lib/api';
import {
  GraphData,
  Node_,
} from './types/graph';

type Stage = 'local' | 'dev' | 'preprod' | 'prod' | 'test';
type InputType = 'query' | 'nodeId';
type LoadingStatus = 'loading' | 'loaded' | 'idle' | 'error';

export interface AppState {
  stage: Stage
  corpusId: number | null
  inputType: InputType
  input: string | null
  graph: GraphData | null
  loadingStatus: LoadingStatus
  response: Node_ | null

  // Synchronous actions
  setStage: (stage: Stage) => void
  setCorpusId: (id: number) => void
  setInputType: (type: InputType) => void
  setInput: (input: string) => void
  setGraph: (g: GraphData) => void
  setLoadingStatus: (status: LoadingStatus) => void
  setResponse: (node: Node_ | null) => void

  // Async/thunk-like actions
  loadCorpus: (id: number) => Promise<void>
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
    setCorpusId: (id: number) => set({ corpusId: id }),
    setInputType: (type: InputType) => set({ inputType: type }),
    setInput: (val: string | null) => set({ input: val }),
    setGraph: (g: GraphData) => set({ graph: g }),
    setLoadingStatus: (status: LoadingStatus) => set({ loadingStatus: status }),
    setResponse: (node: Node_) => set({ response: node }),

    // ─────────────────────────────────────────────────────────
    // loadCorpus: gets the corpus node's graph from the backend
    // ─────────────────────────────────────────────────────────
    loadCorpus: async (id: number) => {
      set({ loadingStatus: 'loading' })
      try {
        // Use get_node to retrieve the graph for that node (the corpus ID).
        const data: GraphData = await getNode(String(id))

        set({
          graph: data,
          loadingStatus: 'loaded',
          corpusId: id,
          input: String(id),
          inputType: 'nodeId',
          // Optionally set response to null
          response: null,
        })
      } catch (err) {
        console.error('Error loading corpus:', err)
        set({ loadingStatus: 'error' })
      }
    },

    // ─────────────────────────────────────────────────────────
    // searchQuery: calls query(queryString) → returns GraphData
    // ─────────────────────────────────────────────────────────
    searchQuery: async (queryStr: string) => {
      set({ loadingStatus: 'loading' })
      try {
        const data: GraphData = await queryGraph(queryStr)

        // Suppose we put the new graph in state, and any specific
        // "answer" node you want might or might not come back from the server.
        // For now, assume you handle it in "response" if needed.
        set({
          graph: data,
          loadingStatus: 'loaded',
          input: queryStr,
          inputType: 'query',
          response: null, // or parse out a node from data if you need
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
      set({ loadingStatus: 'loading' })
      try {
        const data: GraphData = await getNode(nodeId)

        // If you want to pick a particular node from the returned graph
        // as your “response,” you can do so below.  For example, the first node:
        let responseNode: Node_ | null = null
        if (data.nodes.length > 0) {
          responseNode = data.nodes[0]
        }

        set({
          graph: data,
          loadingStatus: 'loaded',
          input: nodeId,
          inputType: 'nodeId',
          response: responseNode,
        })
      } catch (err) {
        console.error('Error focusing node:', err)
        set({ loadingStatus: 'error' })
      }
    },
  }))
)