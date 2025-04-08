// components/TiptapMarkdownEditor.tsx
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Mathematics from '@tiptap-pro/extension-mathematics';
import Typography from '@tiptap/extension-typography';
import History from '@tiptap/extension-history';
import { all, createLowlight } from 'lowlight';
import 'katex/dist/katex.min.css';

import { markdownToHtml } from '../../lib/markdownToHtml';
import '@/app/styles/editorStyles.css';
import EditorMenu from './EditorMenu';


const lowlight = createLowlight(all);
const CodeBlock = CodeBlockLowlight.configure({
  lowlight
});


interface TiptapMarkdownEditorProps {
  markdown: string;
  onChange?: (md: string) => void;
}

const TiptapMarkdownEditor: React.FC<TiptapMarkdownEditorProps> = ({ markdown, onChange }) => {
  const [initialHtml, setInitialHtml] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        history: false,
        listItem: {
          HTMLAttributes: {
            class: 'mt-2 text-base [&>p]:mt-0',
          },
        },
      }),
      Markdown,
      Mathematics,
      CodeBlock,
      Typography,
      History.configure({
        depth: 100,
        newGroupDelay: 500
      })
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const md = editor.storage.markdown.getMarkdown();
      console.log('Markdown:', md);
      onChange?.(md);
    },
    immediatelyRender: false
  });

  // Load initial markdown
  useEffect(() => {
    const load = async () => {
      const html = await markdownToHtml(markdown);
      setInitialHtml(html);
    };
    load();
  }, [markdown]);

  useEffect(() => {
    if (editor && initialHtml) {
      editor.commands.setContent(initialHtml, false);
    }
  }, [editor, initialHtml]);

  return (
    <>
      <EditorMenu editor={editor} />
      <EditorContent
        editor={editor}
        className="focus:outline-none"
      />
    </>
  );
};

export default TiptapMarkdownEditor;
