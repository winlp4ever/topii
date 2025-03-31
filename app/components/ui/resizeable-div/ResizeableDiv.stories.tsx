// components/ui/resizeableDiv.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ResizableDiv from './ResizeableDiv';

const meta: Meta<typeof ResizableDiv> = {
  title: 'UI/ResizableDiv',
  component: ResizableDiv,
  tags: ['autodocs'],
  argTypes: {
    minWidth: { control: 'number' },
    minHeight: { control: 'number' },
    maxWidth: { control: 'number' },
    maxHeight: { control: 'number' },
    lockAspectRatio: { control: 'boolean' },
    selected: { control: 'boolean' },
    selectable: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ResizableDiv>;

export const Default: Story = {
  args: {
    selected: true,
    selectable: true,
    minWidth: 100,
    minHeight: 100,
    lockAspectRatio: false,
    className: 'bg-gray-100',
  },
  render: (args) => (
    <div style={{ padding: 40 }}>
      <ResizableDiv {...args}>
        <div className="w-full h-full flex items-center justify-center text-sm text-gray-700">
          Drag the corners!
        </div>
      </ResizableDiv>
    </div>
  ),
};
