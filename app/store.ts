import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchStreamedGraph, queryGraph, resolveClientId } from './lib/api';
import { DataState, State } from './types/data-state';
import { AISettings, LLMEnum } from './types/ai';

export type Stage = 'local' | 'dev' | 'preprod' | 'prod' | 'test';
export type InputType = 'query' | 'nodeId';

export interface AppState {
  stage: Stage
  clientId: number | null
  corpusId: string | null
  inputType: InputType
  input: string | null
  data: DataState | null
  loadingStatus: State
  aiSettings: AISettings

  // Synchronous actions
  setStage: (stage: Stage) => void
  setCorpusId: (id: string) => void
  setInputType: (type: InputType) => void
  setInput: (input: string) => void

  setData: (d: DataState) => void

  setLoadingStatus: (status: State) => void

  setAIModel: (model: LLMEnum) => void

  // Async/thunk-like actions
  loadCorpus: (id: string) => Promise<void>
  searchQuery: (query: string, modelChoice: LLMEnum | null) => Promise<void>
  focusNode: (nodeId: string) => Promise<void>
}

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    stage: 'local',
    clientId: null,
    corpusId: null,
    inputType: 'nodeId',
    input: '',
    data: null,
    loadingStatus: 'IDLE',
    aiSettings: {
      model: LLMEnum.GPT4O
    },

    setStage: (stage: Stage) => set({ stage }),
    setClientId: (id: number) => set({ clientId: id }),
    setCorpusId: (id: string) => set({ corpusId: id }),
    setInputType: (type: InputType) => set({ inputType: type }),
    setInput: (val: string | null) => set({ input: val }),
    setData: (d: DataState) => set({ data: d }),
    setLoadingStatus: (status: State) => set({ loadingStatus: status }),
    setAIModel: (model: LLMEnum) => set({ aiSettings: { model } }),

    // ─────────────────────────────────────────────────────────
    // loadCorpus: gets the corpus node's graph from the backend
    // ─────────────────────────────────────────────────────────
    loadCorpus: async (id: string) => {
      set({ loadingStatus: 'RUNNING', data: null });
      try {
        set({ corpusId: id });
        console.log('loading corpus:', id);

        const clientId = await resolveClientId(id);
        console.log('resolved client ID:', clientId);
        set({ clientId });

        // Use the streaming endpoint: pass node_id as the corpus id string
        await fetchStreamedGraph(clientId, id, (data: DataState) => {
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
    searchQuery: async (query: string, modelChoice: LLMEnum | null = null) => {
      const clientId = useAppStore.getState().clientId;
      if (!clientId) {
        console.error('No client ID found');
        return; // Exit early
      }
      const corpusId = useAppStore.getState().corpusId;
      if (!corpusId) {
        console.error('No corpus ID found');
        return;
      }
      set({ loadingStatus: 'RUNNING', data: null });
      try {
        const cid = Number(corpusId.split('_')[1]);
        let modelName: LLMEnum;
        if (modelChoice) {
          modelName = modelChoice;
        } else {
          modelName = useAppStore.getState().aiSettings.model;
        }
        await queryGraph(
          clientId,
          cid,
          query,
          (data: DataState) => {
            console.log('streamed data:', data);
            set({ data });
          },
          modelName
        );

        set({
          loadingStatus: 'COMPLETED',
          input: query,
          inputType: 'query',
        });
      } catch (err) {
        console.error('Error searching query:', err)
        set({ loadingStatus: 'FAILED' });
      }
    },

    // ─────────────────────────────────────────────────────────
    // focusNode: calls get_node(nodeId) → returns subgraph around that node
    // ─────────────────────────────────────────────────────────
    focusNode: async (nodeId: string) => {
      const clientId = useAppStore.getState().clientId;
      if (!clientId) {
        console.error('No client ID found');
        return; // Exit early
      }
      console.log('focusing node:', nodeId);
      set({ loadingStatus: 'RUNNING', data: null });
      try {
        // Use the streaming endpoint: pass node_id as the node id string
        await fetchStreamedGraph(clientId, nodeId, (data: DataState) => {
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