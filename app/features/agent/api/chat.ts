import { baseApiUrl } from "@/app/api/base";
import { AgentMessageChunk } from "../types/message";
import { handleStreamingResponse } from "../../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { constructFullResponse } from "../utils/api";
import { useAgentStore } from "../store/agent";


/**
 * SendMessageOptions defines the options for sending a message to the agent.
 * @property {string} query - The query to send to the agent.
 * @property {number} corpusId - The ID of the corpus to use.
 * @property {string[]} documentIds - The IDs of the documents to include in the message.
 */
export type SendMessageOptions = {
  query: string;
  corpusId: number;
  documentIds: string[];
};


/**
 * sendMessage sends a message to the agent and returns an async generator that yields AgentMessageChunk.
 *
 * @param {SendMessageOptions} options - The options for sending the message.
 * @returns {AsyncGenerator<AgentMessageChunk>} An async generator that yields AgentMessageChunk.
 */
export async function* sendMessage({
  query,
  corpusId,
  documentIds
}: SendMessageOptions): AsyncGenerator<AgentMessageChunk> {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Accept": "application/json"
  });

  const body = JSON.stringify({
    query,
    corpus_id: corpusId,
    doc_ids: documentIds
  });

  const response = await fetch(`${baseApiUrl}/chat`, {
    method: "POST",
    headers,
    body
  });

  yield* handleStreamingResponse<AgentMessageChunk>(response);
}


/**
 * useSendMessage is a custom hook that provides a mutation function to send messages to the agent.
 * It uses the `useMutation` hook from `@tanstack/react-query` to handle the mutation logic.
 *
 * @returns {Object} An object containing the `sendMessage` function and mutation state.
 */
export const useSendMessage = () => {
  const mutation = useMutation({
    mutationFn: async ({ query, corpusId, documentIds }: SendMessageOptions) => {
      // Clear previous answer and set loading state
      useAgentStore.getState().setAnswer();
      useAgentStore.getState().setIsStreaming(true);
      try {
        const chunks = sendMessage({ query, corpusId, documentIds });
        const response = constructFullResponse(chunks);
        // Iterate over streamed response and update the agent store
        for await (const resp of response) {
          useAgentStore.getState().setAnswer(resp);
        }
      } finally {
        useAgentStore.getState().setIsStreaming(false);
      }
    }
  })
  return {
    sendMessage: mutation.mutate,
    ...mutation
  }
}