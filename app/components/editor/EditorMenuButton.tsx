import { Editor } from "@tiptap/react";
import React from "react";


export interface EditorMenuButtonProps {
  handleClick: () => void;
  editor: Editor;
  isActive: boolean;
  className?: string;
  children?: React.ReactNode;
}


const EditorMenuButton: React.FC<EditorMenuButtonProps> = ({
  handleClick,
  editor,
  isActive,
  children
}) => {
  if (!editor) {
    return null;
  }
  const styleClassName = isActive ? "transition-all p-1 w-6 h-6 rounded flex items-center hover:bg-stone-50 text-rose-600":
    "transition-all p-1 w-6 h-6 rounded flex items-center hover:bg-stone-50 text-stone-600";
  return (
    <button
      onClick={handleClick}
      className={styleClassName}
    >
      {children}
    </button>
  );
};
export default EditorMenuButton;
