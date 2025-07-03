import { AgentMessageChunk, AgentPhaseState, AgentResponse, isTool, ReasoningStep } from "../types/message";


/**
 * Constructs a full AgentResponse from an async generator of AgentMessageChunk.
 * It aggregates the chunks into reasoning steps, updating existing steps or creating new ones as needed.
 *
 * @param chunks - An async generator yielding AgentMessageChunk.
 * @returns An async generator yielding AgentResponse with aggregated reasoning steps.
 */
export async function* constructFullResponse(
  chunks: AsyncGenerator<AgentMessageChunk>
): AsyncGenerator<AgentResponse> {
  // Initialize an empty response object
  const response: AgentResponse = { steps: [] };

  // Iterate over each chunk from the async generator
  // and update the response object accordingly
  for await (const chunk of chunks) {
    // Filter steps to find the one matching the toolId
    const newResponse = { ...response }; // Create a shallow copy of the response
    const steps = newResponse.steps.filter(step => step.id === chunk.toolId);
    if (steps.length === 0 || (!isTool(chunk.source) && newResponse.steps[newResponse.steps.length - 1].id !== chunk.toolId)) {
      const newStep: ReasoningStep = {
        id: chunk.toolId,
        type: chunk.source,
        content: chunk.content || '',
        state: chunk.state || AgentPhaseState.Started,
        eventMessage: chunk.eventMessage || ''
      }
      newResponse.steps.push(newStep);
      // mark all previous steps of same id as completed
      steps.forEach((step, idx) => {
        if (idx < steps.length - 1) {
          step.state = AgentPhaseState.Completed;
        }
      })
    } else {
      // If a step with the same toolId exists, update it
      const currentStep = steps[steps.length - 1];
      currentStep.content = (currentStep.content || '') + (chunk.content || '');
      if (chunk.state) {
        currentStep.state = chunk.state;
      }
      if (chunk.eventMessage) {
        currentStep.eventMessage = chunk.eventMessage;
      }
    }
    yield newResponse;
  }
}