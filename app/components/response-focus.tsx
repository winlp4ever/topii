'use client';
import React from 'react';
import { useAppStore } from '../store';

// This is the response focus component
export function ResponseFocus() {
  const response = useAppStore((state) => state.response);

  if (!response) {
    return <div>No response to display.</div>;
  }

  // e.g. if response is an Answer node:
  if (response.answer) {
    return (
      <div>
        <h4>Answer:</h4>
        <p>{response.answer.text}</p>
        <div>
          <strong>Sources:</strong>
          {response.answer.sources.map((block) => (
            <div key={block.id}>{block.text}</div>
          ))}
        </div>
      </div>
    );
  }

  // or if response.doc, show doc details, etc.
  if (response.doc) {
    return (
      <div>
        <h4>Document Title: {response.doc.title}</h4>
        <p>Short Summary: {response.doc.short_summary}</p>
        <p>Long Summary: {response.doc.long_summary}</p>
      </div>
    );
  }

  // fallback
  return <div>Unrecognized node type.</div>;
}
