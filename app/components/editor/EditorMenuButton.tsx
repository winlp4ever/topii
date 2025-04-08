import { cn } from "@/app/lib/utils";
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
  className,
  children
}) => {
  if (!editor) {
    return null;
  }
  const defaultStyleClassName = "transition-all p-1 rounded [&>svg]:stroke-stone-800";
  const styleClassName = cn(defaultStyleClassName, className);
  console.log(styleClassName);
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
