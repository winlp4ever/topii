import { Card, CardContent } from "@/components/ui/card";
import { CardLabel, CardLabelTitle } from "../ui/card";
import MarkdownView from "../markdown-view";

export interface EntityFullViewProps {
  title: string;
  text: string;
  icon?: React.ReactNode;
  typeName?: string;
  onTitleChange?: (value: string) => void;
  onTextChange?: (value: string) => void;
}


const EntityFullView: React.FC<EntityFullViewProps> = ({ title, text, icon, typeName }) => {
  return (
    <Card>
      <CardLabel className="">
        <CardLabelTitle className="">
          {icon}
          <span
            className='font-medium text-sm'
          >
            {typeName}
          </span>
        </CardLabelTitle>
      </CardLabel>
      <CardContent className='pt-6'>
        <h1 className='text-3xl font-bold mb-4'>{title}</h1>
        <MarkdownView content={text} />
      </CardContent>
    </Card>
  );
}
export default EntityFullView;