import { Card, CardContent } from "@/components/ui/card";
import { CardLabel, CardLabelTitle } from "../ui/card";
import MarkdownView from "../markdown-view";


/**
 * Props for the EntityFullView component.
 * @property {string} title - The title of the entity.
 * @property {string} text - The text content of the entity.
 * @property {React.ReactNode} [icon] - Optional icon to display in the card label.
 * @property {string} [typeName] - Optional type name to display in the card label.
 * @property {(value: string) => void} [onTitleChange] - Optional callback for title change.
 * @property {(value: string) => void} [onTextChange] - Optional callback for text change.
 */
export interface EntityFullViewProps {
  title: string;
  text: string;
  icon?: React.ReactNode;
  typeName?: string;
  onTitleChange?: (value: string) => void;
  onTextChange?: (value: string) => void;
}


/**
 * EntityFullView component displays a full view of an entity with a title, text content, and an optional icon.
 * It is designed to be used in a card layout.
 *
 * @param {EntityFullViewProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
const EntityFullView: React.FC<EntityFullViewProps> = ({
  title,
  text,
  icon,
  typeName
}: EntityFullViewProps) => {
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