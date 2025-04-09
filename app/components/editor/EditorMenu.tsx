import {
  BubbleMenu, Editor
} from '@tiptap/react';
import EditorMenuButton from './EditorMenuButton';
import { Bold, Code, Italic, List, ListOrdered, Strikethrough, Terminal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';


export interface EditorMenuProps {
  editor: Editor | null;
}


const EditorMenu: React.FC<EditorMenuProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <BubbleMenu
      className='bg-white rounded-xl shadow-md px-3 py-1 border'
      editor={editor}
      tippyOptions={{
        duration: 100,
        placement: 'top',
      }}
    >
      <div className="flex flex-row gap-2 items-center">
        <EditorMenuButton
          handleClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          editor={editor}
        >
          <Bold className={"w-4 h-4 flex-shrink-0"} />
        </EditorMenuButton>
        <EditorMenuButton
          handleClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          editor={editor}
        >
          <Italic className="w-4 h-4 flex-shrink-0" />
        </EditorMenuButton>
        <EditorMenuButton
          handleClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          editor={editor}
        >
          <Strikethrough className="w-4 h-4 flex-shrink-0" />
        </EditorMenuButton>
        <Separator orientation='vertical' />
        <EditorMenuButton
          handleClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          editor={editor}
        >
          <List className="w-4 h-4 flex-shrink-0" />
        </EditorMenuButton>
        <EditorMenuButton
          handleClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          editor={editor}
        >
          <ListOrdered className="w-4 h-4 flex-shrink-0" />
        </EditorMenuButton>
        <Separator orientation='vertical' />
        <EditorMenuButton
          handleClick={() => editor.chain().focus().setCode().run()}
          isActive={editor.isActive('code')}
          editor={editor}
        >
          <Code className="w-4 h-4 flex-shrink-0" />
        </EditorMenuButton>
        <EditorMenuButton
          handleClick={() => editor.chain().focus().setCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          editor={editor}
        >
          <Terminal className="w-4 h-4 flex-shrink-0" />
        </EditorMenuButton>
      </div>
    </BubbleMenu>
  );
}
export default EditorMenu;