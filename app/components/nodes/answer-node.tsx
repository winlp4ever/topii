import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Answer } from "../../types/graph";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MarkdownView from "../markdown-view";

export const AnswerView: React.FC<{ answer: Answer }> = ({ answer }) => {
  return (
    <div>
      <Card className='w-full'>
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <MarkdownView content={answer.text} />
        </CardContent>
      </Card>
    </div>
  )
}

const AnswerNode: React.FC<{ answer: Answer }> = ({ answer }) => {
  const convertToPlainText = (text: string) => {
    // use regex to remove markdown syntax
    return text.replace(/[#*`]/g, '');
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <Button className="w-20 h-20 p-0 rounded-full flex-shrink-0 text-4xl" variant='pink'>
            { "✨" }
          </Button>
          <span className="absolute left-20 text-black text-xl w-40">
            { convertToPlainText(answer.text).substring(0, 50) }
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-pink-50 border-pink-600">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <MarkdownView content={answer.text} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AnswerNode;