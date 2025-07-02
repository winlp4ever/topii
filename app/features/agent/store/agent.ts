import { create } from "zustand";
import { AgentResponse } from "../types/message";


/**
 * AgentState represents the state of the agent, including whether it is currently streaming a response,
 * the current answer being processed, and methods to update this state.
 */
export interface AgentState {
  isStreaming: boolean;
  query: string;
  answer?: AgentResponse;

  setIsStreaming: (isStreaming: boolean) => void;
  setQuery: (query: string) => void;
  setAnswer: (answer?: AgentResponse) => void;
  reset: () => void;
}


/**
 * useAgentStore is a Zustand store that manages the state of the agent.
 * It provides methods to set whether the agent is streaming, set the current answer,
 * and reset the state.
 */
export const useAgentStore = create<AgentState>((set) => ({
  isStreaming: false,
  answer: undefined,
  query: '',

  setIsStreaming: (isStreaming: boolean) => set({ isStreaming }),
  setQuery: (query: string) => set({ query }),
  setAnswer: (answer?: AgentResponse) => set({ answer }),
  reset: () => set({ isStreaming: false, answer: undefined }),
}));