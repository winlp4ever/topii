import { FileOutput } from "lucide-react";
import { useAppStore } from "../store";
import CurrentAnswerRegenAction from "./regen-answer";


const ReactionBar: React.FC = () => {
  const input = useAppStore((state) => state.input);
  return (
    <div className='flex flex-row gap-2 w-full'>
      <div className='flex flex-row gap-1 items-center p-1'>
        { input && <CurrentAnswerRegenAction query={input} /> }
        <button
          className='flex items-center gap-1 text-xs border-none px-2 py-1 rounded-lg text-stone-400 hover:text-stone-700 transition-all duration-200 ease-in-out'
        >
          <FileOutput strokeWidth={1.5} className="h-4 w-4" />
          <span>{"Export"}</span>
        </button>
      </div>
    </div>
  );
}

export default ReactionBar;