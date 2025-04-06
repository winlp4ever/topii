import React, { useEffect } from "react";
import { toast } from "sonner";

import { Node_, NodeType } from "@/app/types/graph";
import { Card, CardContent } from "@/components/ui/card";
import { CardLabel, CardLabelTitle } from "../ui/card";
import MarkdownView from "../markdown-view";
import { BasicInfo, extractBasicInfo } from "./utils";
import { capitalize } from "../utils";
import { cn } from "@/app/lib/utils";
import { ColorMode, ColorModeTextClassName } from "@/app/types/color-mode";
import { NodeTypeIconMapping } from "./color-mapping";
import { EntityCardDisplayMode } from "@/app/types/entity/displayMode";
import NodeView from "./node-view";
import CopyToClipboard from "../basic/copyToClipboard";
import { TypeTabnameMapping } from "./typeMapping";



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

  const [groups, setGroups] = React.useState<Record<NodeType, Node_[]>>({} as Record<NodeType, Node_[]>);

  useEffect(() => {
    if (subNodeGroups && Object.keys(subNodeGroups).length > 0) {
      setActiveTab(Object.keys(subNodeGroups)[0] as NodeType);
      setGroups(subNodeGroups);
    }
  }, [subNodeGroups]);

  const tab = (type: NodeType) => {
    return (
      <button
        key={type}
        className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none space-x-2"
        onClick={() => setActiveTab(type)}
        data-state={activeTab === type ? 'active' : 'inactive'}
      >
        {React.createElement(NodeTypeIconMapping[type])}
        <span>{TypeTabnameMapping[type]}</span>
      </button>
    );
  };

  const tabs = Object.keys(groups).map((type => tab(type as NodeType)));

  return (
    <div className="p-6 pt-0 flex space-y-2 flex-col">
      <div className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
        {tabs}
      </div>
      <div>
        {activeTab !== null && (
          <div className='flex flex-col justify-start items-start gap-2'>
            {groups[activeTab].map((node) => (
              <NodeView
                key={node.id}
                node={node}
                colorMode='stone'
                className='max-w-[650px]'
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export interface EntityCardProps extends React.HTMLAttributes<HTMLDivElement>{
  displayMode: EntityCardDisplayMode;
  node: Node_;
  subNodes?: Node_[];
  colorMode?: ColorMode;
}


const EntityCard = React.forwardRef<
  HTMLDivElement,
  EntityCardProps
>(({
  displayMode,
  node,
  subNodes = [],
  colorMode = 'zinc',
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
  const [subNodeGroups, setSubNodeGroups] = React.useState<Record<NodeType, Node_[]>>({} as Record<NodeType, Node_[]>);

  useEffect(() => {
    extractBasicInfo(node).then(setBasicInfo);
  }
  , [node]);

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
    if (subNodes.length > 0) {
      setSubNodeGroups(groupByType(subNodes));
    }
  }, [subNodes]);

  const TypeIcon = basicInfo.typeIcon;

  const cardLabelClassName = dynamicDisplayMode === EntityCardDisplayMode.MEDIUM ?
    `bg-transparent` :
    '';

  const cardLabelTitleClassName = `${ColorModeTextClassName[colorMode]}`;

  return (
    <Card
      ref={ref}
      className={cn(
        'w-[800px] overflow-hidden shadow-none border-none relative rounded-3xl',
        className
      )}
      {...props}
    >
      <CardLabel className={cardLabelClassName}>
        <CardLabelTitle className={cardLabelTitleClassName}>
          <TypeIcon />
          <span
            className={'font-medium' + (dynamicDisplayMode === 'full' ? ' text-base' : ' text-sm')}
          >
            {capitalize(basicInfo.typeName)}
          </span>
        </CardLabelTitle>
      </CardLabel>
      {
        basicInfo.content !== null &&
        <CopyToClipboard
          copyToClipboard={copyToClipboard}
        />
      }
      {
        basicInfo.content !== null &&
        <CardContent className='pt-6'>
          <MarkdownView content={basicInfo.content} />
        </CardContent>
      }
      {
        subNodes.length > 0 &&
        <NodeTabs subNodeGroups={subNodeGroups} />
      }
    </Card>
  );
});
EntityCard.displayName = "EntityCard";

export default EntityCard;