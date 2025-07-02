/**
 * AgentPhaseState represents the state of an agent's phase in a process.
 */
export enum AgentPhaseState {
  Started = 'started',
  Completed = 'completed',
  Error = 'error'
}


/**
 * AgentMessageType defines the types of messages that can be sent by the agent.
 */
export enum AgentMessageType {
  Token = 'token',
  State = 'state'
}


/**
 * AgentSource defines the sources from which the agent can retrieve information.
 */
export enum AgentSource {
  KnowledgeBaseSearch = 'knowledge_base_search',
  WebSearch = 'web_search',
  RawMessage = 'raw_message',
  AnswerReformulate = 'answer_reformulate',
}


/**
 * isTool checks if the given source type is a tool used by the agent.
 *
 * @param sourceType - The source type to check.
 * @returns {boolean} - Returns true if the source type is a tool, false otherwise.
 */
export function isTool(sourceType: AgentSource): boolean {
  return (
    sourceType === AgentSource.KnowledgeBaseSearch ||
    sourceType === AgentSource.WebSearch
  )
}


/**
 * isMessage checks if the given source type is a message sent by the agent.
 *
 * @param sourceType - The source type to check.
 * @returns {boolean} - Returns true if the source type is a message, false otherwise.
 */
export function isMessage(sourceType: AgentSource): boolean {
  return (
    sourceType === AgentSource.RawMessage ||
    sourceType === AgentSource.AnswerReformulate
  )
}


/**
 * AgentSourceLabels provides human-readable labels for each AgentSource.
 */
export const AgentSourceLabels: Record<AgentSource, string> = {
  [AgentSource.KnowledgeBaseSearch]: 'Knowledge Base Search',
  [AgentSource.WebSearch]: 'Web Search',
  [AgentSource.RawMessage]: 'Raw Message',
  [AgentSource.AnswerReformulate]: 'Answer Reformulate',
};


/**
 * AgentMessageChunk represents a chunk of message sent by the agent.
 */
export interface AgentMessageChunk {
  toolId: string;
  source: AgentSource;
  type: AgentMessageType;
  state?: AgentPhaseState;
  content?: string;
  eventMessage?: string;
}


/**
 * ReasoningStep represents a step in the agent's reasoning process.
 */
export interface ReasoningStep {
  id: string;
  type: AgentSource;
  content?: string;
  state: AgentPhaseState;
  eventMessage?: string;
}


/**
 * AgentResponse represents the response from the agent, containing reasoning steps.
 */
export interface AgentResponse {
  steps: ReasoningStep[];
}