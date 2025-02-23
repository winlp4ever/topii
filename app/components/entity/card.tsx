import { Node_, NodeType } from "@/app/types/graph";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardLabel, CardLabelTitle } from "../ui/card";
import MarkdownView from "../markdown-view";
import { extractBasicInfo } from "./utils";
import React, { useEffect } from "react";
import { capitalize } from "../utils";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Minimize, Workflow } from "lucide-react";
import { ColorMode, ColorModeBorderClassName, ColorModeDarkBackgroundClassName, ColorModeLightBackgroundClassName, ColorModeTextClassName } from "@/app/types/color-mode";
import { useAppStore } from "@/app/store";


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


const NodeTabs: React.FC<{ subNodeGroups: Record<NodeType, Node_[]> }> = ({ subNodeGroups }) => {
  const [activeTab, setActiveTab] = React.useState<NodeType | null>(null);

  useEffect(() => {
    setActiveTab(Object.keys(subNodeGroups)[0] as NodeType);
  }, [subNodeGroups]);

  return (
    <div className="flex space-x-2">
      <div className="flex space-x-2">
        {Object.keys(subNodeGroups).map((type) => (
          <button
            key={type}
            className="px-4 py-2 text-sm rounded-md bg-gray-200"
            onClick={() => setActiveTab(type as NodeType)}
          >
            {type}
          </button>
        ))}
      </div>
      <div>
        {activeTab && (
          <div>
            {subNodeGroups[activeTab].map((node) => (
              <EntityCard key={node.id} displayMode="mini" node={node} />
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
    <div className="flex space-y-2 w-full">
      <Button
        variant='outline'
        className='rounded-lg text-sm w-full space-x-2 shadow-none text-card-foreground'
        onClick={() => focusNode(nodeId)}
      >
        <Workflow strokeWidth={1.5} className='w-4 h-4' />
        <span>Explore related content</span>
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
}


const EntityCard: React.FC<EntityCardProps> = ({
  displayMode,
  node,
  subNodes = [],
  colorMode = 'slate',
  isRoot = false,
  className,
  ...props
}) => {
  const [dynamicDisplayMode, setDynamicDisplayMode] = React.useState(displayMode);

  const toggleDisplayMode = () => {
    if (dynamicDisplayMode === 'mini') {
      setDynamicDisplayMode('medium');
    } else if (dynamicDisplayMode === 'medium') {
      setDynamicDisplayMode('mini');
    }
  };

  React.useEffect(() => {
    setDynamicDisplayMode(displayMode);
  }, [displayMode]);

  const info = extractBasicInfo(node);
  const TypeIcon = info.typeIcon;
  const subNodeGroups = groupByType(subNodes);

  const nodeButtonClassName = `rounded-l-full rounded-r-md w-full items-center justify-start
    ${ColorModeTextClassName[colorMode]} overflow-hidden text-left
    ${isRoot ? ColorModeBorderClassName[colorMode]: ''}`;

  const nodeButtonNodeClassName = `flex items-center justify-center w-4 h-4
    ${ColorModeDarkBackgroundClassName[colorMode]} rounded-full`;

  const cardLabelClassName = dynamicDisplayMode === 'medium' ?
    `${ColorModeLightBackgroundClassName[colorMode]}` :
    '';

  const cardLabelTitleClassName = dynamicDisplayMode === 'medium' ?
    `${ColorModeTextClassName[colorMode]}` :
    '';

  return (
    <Card
      className={cn(
        dynamicDisplayMode === 'mini' ?
        'transition-all duration-300 ease-in-out w-96 bg-transparent shadow-none border-none max-h-20' :
        dynamicDisplayMode === 'medium' ?
        `transition-all duration-300 ease-in-out w-96 overflow-hidden max-h-[600px] ${isRoot ? ColorModeBorderClassName[colorMode]: ''}`:
        'transition-all duration-300 ease-in-out w-[650px] border-none shadow-none overflow-hidden',
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
          <span className={nodeButtonNodeClassName} />
          <TypeIcon />
          <span className="w-80 truncate">{ info.label }</span>
        </Button>
      }
      {
        dynamicDisplayMode !== 'mini' &&
        <CardLabel className={cardLabelClassName}>
          <CardLabelTitle className={cardLabelTitleClassName}>
            <TypeIcon />
            <span>{capitalize(info.typeName)}</span>
          </CardLabelTitle>
          {
            dynamicDisplayMode === 'medium' &&
            <button
              className="bg-none outline-none ml-auto"
              onClick={toggleDisplayMode}
            >
              <Minimize strokeWidth={1.5} className='w-4 h-4 transition-all text-card-foreground'/>
            </button>
          }
        </CardLabel>
      }
      {
        dynamicDisplayMode !== 'mini' && info.title !== null &&
        <CardHeader>
          <CardTitle className='text-lg'>{info.title}</CardTitle>
          {
            info.description !== null &&
            <CardDescription className='[&_*_li]:mt-2'>
              <MarkdownView content={info.description} />
            </CardDescription>
          }
        </CardHeader>
      }
      {
        dynamicDisplayMode === 'full' && info.content !== null &&
        <CardContent>
          <MarkdownView content={info.content} />
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
}

export default EntityCard;