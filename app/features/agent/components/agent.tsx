'use client';
import { useAgentStore } from '../store/agent';
import { UserMessage } from './chat/user-message';
import { ReasoningStepsView } from './chat/reasoning-steps';
import TiptapMarkdownEditor from '@/app/components/editor/markdown-editor';
import { isMessage, isTool } from '../types/message';
import { ScrollArea } from '@/components/ui/scroll-area';


// This is the response focus component
export const AgentView = () => {
  const isStreaming = useAgentStore((state) => state.isStreaming);
  const query = useAgentStore((state) => state.query);
  const answer = useAgentStore((state) => state.answer);

  console.log('content', answer && answer.steps.length > 0 ? answer.steps[answer.steps.length - 1].content : 'No content');

  return (
    <>
      <ScrollArea
        className="h-screen w-screen bg-stone-50"
      >
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <div
            className='h-full sm:max-w-[800px] w-[800px]'
          >
            <div className='mt-32 flex flex-col items-end space-y-8'>
              {
                query
                &&
                <UserMessage message={query} />
              }
              {
                (query || answer) &&
                <ReasoningStepsView response={answer} isStreaming={isStreaming} />
              }
              {
                answer && answer.steps.length > 0 && isMessage(answer.steps[answer.steps.length - 1].type) &&
                <div className='w-full p-4'>
                  <TiptapMarkdownEditor
                    markdown={answer.steps[answer.steps.length - 1].content || ''}
                    readonly={true}
                  />
                </div>
              }
              <div className='h-48'>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}