import React, { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TiptapMarkdownEditor from './TiptapMarkdownEditor';
import MarkdownView from '../markdown-view';

const meta: Meta<typeof TiptapMarkdownEditor> = {
  title: 'Components/TiptapMarkdownEditor',
  component: TiptapMarkdownEditor,
};

export default meta;

type Story = StoryObj<typeof TiptapMarkdownEditor>;

const sampleMarkdown = `
# Welcome to Tiptap Editor

This is a **bold** and *italic* text example.

## Math

Inline math: $a^2 + b^2 = c^2$

Block math:

$$
\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}
$$
`;

export const Default: Story = {
  render: () => {
    const [markdown, setMarkdown] = useState(sampleMarkdown);
    const hasInitialized = useRef(false);

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded border border-stone-300">
        <TiptapMarkdownEditor
          markdown={sampleMarkdown}
          onChange={(md) => {
            // Prevent re-setting content when Tiptap initializes
            if (!hasInitialized.current) {
              hasInitialized.current = true;
              return;
            }
            setMarkdown(md); // ✅ updates <pre> below
          }}
        />
        <hr className="my-6" />
        <h2 className="text-xl font-semibold mb-2">Live Markdown Output</h2>
        <pre className="bg-stone-100 p-4 text-sm rounded whitespace-pre-wrap overflow-x-auto">
          {markdown}
        </pre>
        <hr className="my-6" />
        <div>
          <MarkdownView content={markdown} />
        </div>
      </div>
    );
  },
};
