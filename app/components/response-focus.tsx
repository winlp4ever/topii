'use client';
import React from 'react';
import { useAppStore } from '../store';
import { AnswerView } from './nodes/answer-node';
import { DocView } from './nodes/doc-node';

// This is the response focus component
export function ResponseFocus() {
  const response = useAppStore((state) => state.response);

  if (!response) {
    return <div>No response to display.</div>;
  }

  // e.g. if response is an Answer node:
  if (response.answer) {
    return <AnswerView answer={response.answer} />;
  }

  // or if response.doc, show doc details, etc.
  if (response.doc) {
    return <DocView doc={response.doc} />;
  }

  // fallback
  return <div>Unrecognized node type.</div>;
}
