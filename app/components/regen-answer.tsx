import { RefreshCcw } from "lucide-react";
import { useAppStore } from "../store";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { LLMEnum, LLMName } from "../types/ai";


export interface CurrentAnswerRegenActionProps {
  query: string;
}


const CurrentAnswerRegenAction: React.FC<CurrentAnswerRegenActionProps> = ({ query }) => {
  const searchQuery = useAppStore((state) => state.searchQuery);
  const regen = (value: LLMEnum) => {
    if (!query) {
      return;
    }
    searchQuery(query, value);
  }
  return (
    <Select onValueChange={regen}>
      <SelectTrigger
        className="flex items-center gap-1 text-xs border-none shadow-none px-2 py-1 rounded-lg text-stone-400 hover:text-stone-700 transition-all duration-200 ease-in-out focus:ring-0"
        showSelectIcon={false}
      >
        <RefreshCcw strokeWidth={1.75} className="h-4 w-4" />
        <span>{"Rewrite"}</span>
      </SelectTrigger>
      <SelectContent className='overflow-visible'>
        <SelectGroup>
          <SelectLabel className='text-xs px-2 py-1 text-stone-400'>Rewrite this answer</SelectLabel>
          {
              Object.values(LLMEnum).map((model) => (
                <SelectItem key={model} value={model} className='text-xs text-mono'>
                  <span>{LLMName[model]}</span>
                </SelectItem>
              ))
            }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CurrentAnswerRegenAction;