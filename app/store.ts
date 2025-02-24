import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchStreamedGraph, queryGraph } from './lib/api';
import { DataState, State } from './types/data-state';

export type Stage = 'local' | 'dev' | 'preprod' | 'prod' | 'test';
export type InputType = 'query' | 'nodeId';

export interface AppState {
  stage: Stage
  corpusId: string | null
  inputType: InputType
  input: string | null
  data: DataState | null
  loadingStatus: State

  // Synchronous actions
  setStage: (stage: Stage) => void
  setCorpusId: (id: string) => void
  setInputType: (type: InputType) => void
  setInput: (input: string) => void

  setData: (d: DataState) => void

  setLoadingStatus: (status: State) => void

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
    data: null,
    loadingStatus: 'IDLE',

    setStage: (stage: Stage) => set({ stage }),
    setCorpusId: (id: string) => set({ corpusId: id }),
    setInputType: (type: InputType) => set({ inputType: type }),
    setInput: (val: string | null) => set({ input: val }),
    setData: (d: DataState) => set({ data: d }),
    setLoadingStatus: (status: State) => set({ loadingStatus: status }),

    // ─────────────────────────────────────────────────────────
    // loadCorpus: gets the corpus node's graph from the backend
    // ─────────────────────────────────────────────────────────
    loadCorpus: async (id: string) => {
      set({ loadingStatus: 'RUNNING' });
      try {
        set({ corpusId: id });
        console.log('loading corpus:', id);

        // Use the streaming endpoint: pass node_id as the corpus id string
        await fetchStreamedGraph(id, (data: DataState) => {
          // Update the data as it arrives
          console.log('streamed data:', data);
          set({ data });
        });

        set({
          loadingStatus: 'COMPLETED',
          input: String(id),
          inputType: 'nodeId',
        });
      } catch (err) {
        console.error('Error loading corpus:', err);
        set({ loadingStatus: 'FAILED' });
      }
    },

    // ─────────────────────────────────────────────────────────
    // searchQuery: calls query(queryString) → returns GraphData
    // ─────────────────────────────────────────────────────────
    searchQuery: async (queryStr: string) => {
      const corpusId = useAppStore.getState().corpusId
      if (!corpusId) {
        console.error('No corpus ID found')
        return
      }
      set({ loadingStatus: 'RUNNING' })
      try {
        const cid = Number(corpusId.split('_')[1])
        await queryGraph(cid, queryStr, (data: DataState) => {
          console.log('streamed data:', data)
          set({ data })
        })

        set({
          loadingStatus: 'COMPLETED',
          input: queryStr,
          inputType: 'query',
        })
      } catch (err) {
        console.error('Error searching query:', err)
        set({ loadingStatus: 'FAILED' })
      }
    },

    // ─────────────────────────────────────────────────────────
    // focusNode: calls get_node(nodeId) → returns subgraph around that node
    // ─────────────────────────────────────────────────────────
    focusNode: async (nodeId: string) => {
      console.log('focusing node:', nodeId);
      set({ loadingStatus: 'RUNNING' });
      try {
        // Use the streaming endpoint: pass node_id as the node id string
        await fetchStreamedGraph(nodeId, (data: DataState) => {
          // Update the data as it arrives
          console.log('streamed data:', data);
          set({ data });
        });
        set({
          loadingStatus: 'COMPLETED',
          input: nodeId,
          inputType: 'nodeId',
        });
      } catch (err) {
        console.error('Error focusing node:', err);
        set({ loadingStatus: 'FAILED' });
      }
    },
  }))
)