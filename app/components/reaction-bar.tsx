import { FileOutput } from "lucide-react";
import { useAppStore } from "../store";
import CurrentAnswerRegenAction from "./regen-answer";
import CopyToClipboard from "./basic/copy-to-clipboard";


/**
 * Props for the ReactionBar component.
 */
export interface ReactionBarProps {
  copyToClipboard?: () => void;
}


/**
 * ReactionBar component that displays actions related to the current answer.
 *
 * @param {ReactionBarProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const ReactionBar: React.FC<ReactionBarProps> = ({ copyToClipboard }: ReactionBarProps) => {
  const input = useAppStore((state) => state.input);

  return (
    <div className='flex flex-row gap-2 w-full'>
      <div className='flex flex-row gap-1 items-center p-1'>
        { copyToClipboard && <CopyToClipboard copyToClipboard={copyToClipboard} /> }
        { input && <CurrentAnswerRegenAction query={input} /> }
        <button
          className='flex items-center gap-1 text-xs border-none px-2 py-1 rounded-lg text-stone-400 hover:text-stone-700 transition-all duration-200 ease-in-out'
        >
          <FileOutput strokeWidth={1.75} className="h-4 w-4" />
          <span>{"Export"}</span>
        </button>
      </div>
    </div>
  );
}