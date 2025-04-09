// components/TiptapMarkdownEditor.tsx
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Mathematics from '@tiptap-pro/extension-mathematics';
import Typography from '@tiptap/extension-typography';
import History from '@tiptap/extension-history';
import { all, createLowlight } from 'lowlight';
import 'katex/dist/katex.min.css';

import '@/app/styles/editorStyles.css';
import EditorMenu from './EditorMenu';
import CodeBlockComponent from './CodeBlockComponent';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TabHandler from './extensions/TabHandler';


const lowlight = createLowlight(all);
const CodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  }
}).configure({
  lowlight
});


interface TiptapMarkdownEditorProps {
  markdown: string;
  onChange?: (md: string) => void;
}


const TiptapMarkdownEditor: React.FC<TiptapMarkdownEditorProps> = ({ markdown, onChange }) => {
  const [initialMd, setInitialMd] = useState('');

  const editor = useEditor({
    extensions: [
      TabHandler,
      StarterKit.configure({
        codeBlock: false,
        history: false
      }),
      Markdown,
      Mathematics,
      CodeBlock,
      Typography,
      History.configure({
        depth: 100,
        newGroupDelay: 500
      }),
      TaskItem.configure({
        nested: true
      }),
      TaskList
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const md = editor.storage.markdown.getMarkdown();
      onChange?.(md);
    },
    immediatelyRender: false,
    parseOptions: {
      preserveWhitespace: "full",
    }
  });

  // Load initial markdown
  useEffect(() => {
    const load = async () => {
      setInitialMd(markdown);
    };
    load();
  }, [markdown]);

  useEffect(() => {
    if (editor && initialMd) {
      editor.commands.setContent(
        initialMd,
        false
      );
    }
  }, [editor, initialMd]);

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
