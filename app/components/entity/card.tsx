import { Node_, NodeType } from "@/app/types/graph";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardLabel, CardLabelTitle } from "../ui/card";
import MarkdownView from "../markdown-view";
import { BasicInfo, extractBasicInfo } from "./utils";
import React, { useEffect } from "react";
import { capitalize } from "../utils";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Minimize, Option, Clipboard } from "lucide-react";
import { ColorMode, ColorModeBorderClassName, ColorModeDarkBackgroundClassName, ColorModeTextClassName } from "@/app/types/color-mode";
import { useAppStore } from "@/app/store";
import { toast } from "sonner";


function groupByType(items: Node_[]): Record<NodeType, Node_[]> {
  return items.reduce((acc, item) => {
    // Check if the type already exists in the accumulator
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    // Add the current item to the list for its type
    acc[item.type].push(item);
    return acc;
  }, {} as Record<NodeType, Node_[]>);
}


export const TypeTabnameMapping: Record<NodeType, string> = {
  [NodeType.Block]: 'Source Texts',
  [NodeType.Answer]: 'Answers',
  [NodeType.QA]: 'Q&As',
  [NodeType.Document]: 'Sources',
  [NodeType.Exercise]: 'Activities',
  [NodeType.ROMECompetency]: 'ROME Competencies',
  [NodeType.RNCPCompetency]: 'RNCP Competencies',
  [NodeType.Concept]: 'Key Concepts',
  [NodeType.Corpus]: 'Corpora',
  [NodeType.Text]: "Texts",
  [NodeType.Struct]: "Structs",
};


const NodeTabs: React.FC<{ subNodeGroups: Record<NodeType, Node_[]> }> = ({ subNodeGroups }) => {
  const [activeTab, setActiveTab] = React.useState<NodeType | null>(null);

  const [groups, setGroups] = React.useState<Record<NodeType, Node_[]>>({} as Record<NodeType, Node_[]>);

  useEffect(() => {
    if (subNodeGroups && Object.keys(subNodeGroups).length > 0) {
      setActiveTab(Object.keys(subNodeGroups)[0] as NodeType);
      setGroups(subNodeGroups);
    }
  }, [subNodeGroups]);

  return (
    <div className="p-6 pt-0 flex space-y-2 flex-col">
      <div className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
        {Object.keys(groups).map((type) => (
          <button
            key={type}
            className="inline-flex items-center justify-center whitespace-nowrap py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            onClick={() => setActiveTab(type as NodeType)}
            data-state={activeTab === type ? 'active' : 'inactive'}
          >
            {TypeTabnameMapping[type as NodeType]}
          </button>
        ))}
      </div>
      <div>
        {activeTab !== null && (
          <div className='space-y-2'>
            {groups[activeTab].map((node) => (
              <EntityCard
                key={node.id}
                displayMode="mini"
                node={node}
                showDot={false}
                className='transform scale-99 origin-left [&>button]:rounded-lg [&>button]:shadow-none [&>button]:bg-stone-100 w-full
                  hover:scale-100 [&>button]:hover:shadow-lg transition-all duration-300 ease-in-out [&>button]:border-none shadow-none border-none bg-stone-100'
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


const ActionSection: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const focusNode = useAppStore((state) => state.focusNode);
  return (
    <div className="flex space-y-2 w-full items-center justify-center">
      <Button
        variant='default'
        className='rounded-full text-sm w-auto shadow-none'
        onClick={() => focusNode(nodeId)}
      >
        <Option strokeWidth={1.5} className='w-4 h-4' />
        <span>Explore</span>
      </Button>
    </div>
  );
}


export interface EntityCardProps extends React.HTMLAttributes<HTMLDivElement>{
  displayMode: 'mini' | 'medium' | 'full';
  node: Node_;
  subNodes?: Node_[];
  colorMode?: ColorMode;
  isRoot?: boolean;
  showDot?: boolean;
  toggleCard?: () => void;
}


const EntityCard = React.forwardRef<
  HTMLDivElement,
  EntityCardProps
>(({
  displayMode,
  node,
  subNodes = [],
  colorMode = 'zinc',
  isRoot = false,
  showDot = true,
  toggleCard = () => {},
  className,
  ...props
}, ref) => {
  const [dynamicDisplayMode, setDynamicDisplayMode] = React.useState(displayMode);
  const [basicInfo, setBasicInfo] = React.useState<BasicInfo>({
    label: "untitled",
    title: "untitled",
    description: null,
    content: null,
    entityType: node.type,
    typeName: "Unknown",
    typeIcon: () => <span>?</span>,
  });
  const [displayCardHeader, setDisplayCardHeader] = React.useState(true);
  const [subNodeGroups, setSubNodeGroups] = React.useState<Record<NodeType, Node_[]>>({} as Record<NodeType, Node_[]>);

  useEffect(() => {
    extractBasicInfo(node).then(setBasicInfo);
  }
  , [node]);

  const toggleDisplayMode = () => {
    toggleCard();
    if (dynamicDisplayMode === 'mini') {
      setDynamicDisplayMode('medium');
    } else if (dynamicDisplayMode === 'medium') {
      setDynamicDisplayMode('mini');
    }
  };

  const copyToClipboard = () => {
    if (basicInfo.content === null) {
      return;
    }
    console.log('Copying to clipboard:', basicInfo.content);
    navigator.clipboard.writeText(basicInfo.content);
    toast('Text copied to clipboard!');
  };

  React.useEffect(() => {
    setDynamicDisplayMode(displayMode);
  }, [displayMode]);

  useEffect(() => {
    setDisplayCardHeader(
      (
        dynamicDisplayMode === 'full' && basicInfo.title !== null
      )  || (
        dynamicDisplayMode === 'medium' && (basicInfo.title !== null || basicInfo.description !== null)
      )
    )
  }
  , [dynamicDisplayMode, basicInfo.title, basicInfo.description]);

  const TypeIcon = basicInfo.typeIcon;
  useEffect(() => {
    if (subNodes.length > 0) {
      console.log('subNodes:', subNodes);
      setSubNodeGroups(groupByType(subNodes));
    }
  }, [subNodes]);

  const nodeButtonClassName = `rounded-full w-full items-center justify-start px-3 py-1 border-none
    ${ColorModeTextClassName[colorMode]} overflow-hidden text-left
    ${isRoot ? ColorModeBorderClassName[colorMode]: ''}`;

  const nodeButtonNodeClassName = `flex items-center justify-center w-3 h-3
    ${ColorModeDarkBackgroundClassName[colorMode]} rounded-full`;

  const cardLabelClassName = dynamicDisplayMode === 'medium' ?
    `bg-transparent` :
    '';

  const cardLabelTitleClassName = `${ColorModeTextClassName[colorMode]}`;

  return (
    <Card
      ref={ref}
      className={cn(
        dynamicDisplayMode === 'mini' ?
        'transition-all duration-300 ease-in-out w-80 bg-transparent shadow-none border-none max-h-20' :
        dynamicDisplayMode === 'medium' ?
        `transition-all duration-300 ease-in-out w-96 overflow-hidden max-h-[600px] bg-zinc-50 shadow-lg ${isRoot ? ColorModeBorderClassName[colorMode]: 'border-none'}`:
        'transition-all duration-300 ease-in-out w-[800px] overflow-hidden shadow-none border-none relative',
        className
      )}
      {...props}
    >
      {
        dynamicDisplayMode === 'mini' &&
        <Button
          className={nodeButtonClassName}
          variant={colorMode}
          onClick={toggleDisplayMode}
        >
          {showDot && <span className={nodeButtonNodeClassName} />}
          <TypeIcon />
          <span className="truncate" style={{ width: 'calc(100% - 3rem)' }} >{basicInfo.label}</span>
        </Button>
      }
      {
        dynamicDisplayMode !== 'mini' &&
        <CardLabel className={cardLabelClassName}>
          <CardLabelTitle className={cardLabelTitleClassName}>
            <TypeIcon />
            <span className='font-medium'>{capitalize(basicInfo.typeName)}</span>
          </CardLabelTitle>
          {
            dynamicDisplayMode === 'medium' &&
            <button
              className="bg-none outline-none ml-auto"
              onClick={toggleDisplayMode}
            >
              <Minimize strokeWidth={1.5} className='w-4 h-4 transition-all'/>
            </button>
          }
        </CardLabel>
      }
      {
        displayCardHeader && (
          <CardHeader className='pt-2 text-left'>
            {
              basicInfo.title !== null &&
              <CardTitle className='text-lg'>{basicInfo.title}</CardTitle>
            }
            {
              dynamicDisplayMode === 'medium' && basicInfo.description !== null &&
              <CardDescription className='[&_*_li]:mt-2 text-zinc-700'>
                <MarkdownView content={basicInfo.description} />
              </CardDescription>
            }
          </CardHeader>
        )
      }
      {
        dynamicDisplayMode === 'full' && basicInfo.content !== null &&
        <div className='absolute top-0 right-0 p-1 z-40'>
          <button
            className='hello text-stone-500 text-sm bg-none outline-none hover:bg-stone-100 rounded-lg p-2 transition-all duration-200 ease-in-out'
            onClick={copyToClipboard}
          >
            <Clipboard strokeWidth={1.5} className='w-4 h-4' />
          </button>
        </div>
      }
      {
        dynamicDisplayMode === 'full' && basicInfo.content !== null &&
        <CardContent className={displayCardHeader ? 'pt-0' : 'pt-6'}>
          <MarkdownView content={basicInfo.content} />
        </CardContent>
      }
      {
        dynamicDisplayMode === 'full' && subNodes.length > 0 &&
        <NodeTabs subNodeGroups={subNodeGroups} />
      }
      {
        dynamicDisplayMode === 'medium' && !isRoot &&
        <CardFooter className="flex flex-col space-y-2 items-start">
          <ActionSection nodeId={node.id} />
        </CardFooter>
      }
    </Card>
  );
});
EntityCard.displayName = "EntityCard";

export default EntityCard;