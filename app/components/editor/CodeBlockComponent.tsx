import React, { useCallback } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Clipboard } from 'lucide-react';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { toast } from 'sonner';

interface CodeBlockComponentProps {
  node: ProseMirrorNode;
}

const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({ node }) => {
  const handleCopy = useCallback(() => {
    const code = node.textContent;
    navigator.clipboard.writeText(code).then(() => {
      console.log('Text copied to clipboard: ', code);
      toast('Text copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, [node]);

  // Access the language attribute here
  const language = node.attrs.language || 'plaintext';

  return (
    <NodeViewWrapper className="code-block">
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => handleCopy()}
          className="transition-all absolute top-1 right-1 text-sm bg-transparent hover:bg-stone-200 p-2 rounded-xl text-stone-500 z-10"
          aria-label="Copy to clipboard"
        >
          <Clipboard strokeWidth={1.75} className='h-4 w-4' />
        </button>
        {
          language !== 'plaintext' && (
            <span className="absolute top-0 left-0 w-auto bg-transparent text-[11px] px-4 py-2 text-stone-500 text-sm z-10">
              {language}
            </span>
          )
        }
        <pre>
          <NodeViewContent as="code" className='pt-6' />
        </pre>
      </div>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;