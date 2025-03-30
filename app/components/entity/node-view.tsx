import React, { useEffect } from "react";

import { ColorMode } from "@/app/types/color-mode";
import { BasicInfo, extractBasicInfo } from "./utils";
import { Node_, NodeType } from "@/app/types/graph";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import EntityLabel from "./entity-label";
import EntityMediumView from "./entity-medium-view";


export interface NodeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  node: Node_;
  colorMode?: ColorMode;
}


const NodeView = React.forwardRef<
  HTMLDivElement,
  NodeViewProps
>(({ node, colorMode, className, ...props }, ref) => {
  const [basicInfo, setBasicInfo] = React.useState<BasicInfo>({
    label: "untitled",
    title: "untitled",
    description: null,
    content: null,
    entityType: node.type as NodeType,
    typeName: "Unknown",
    typeIcon: () => <span>?</span>,
  });

  useEffect(() => {
    extractBasicInfo(node).then(setBasicInfo);
  }
  , [node]);

  const label: string = basicInfo.label || "untitled";
  const title: string = basicInfo.title || "untitled";
  const text: string = basicInfo.description || "";
  const typeIcon = React.createElement(basicInfo.typeIcon);

  const entityLabel = (
    <EntityLabel
      nodeId={node.id}
      icon={typeIcon}
      label={label}
      colorMode={colorMode}
      className={className}
      ref={ref}
      {...props}
    />
  )
  if (basicInfo.title === null && basicInfo.description === null) {
    return entityLabel;
  }

  return (
    <Popover>
      <PopoverTrigger>
        {entityLabel}
      </PopoverTrigger>
      <PopoverContent className='p-0 bg-transparent border-none shadow-none'>
        <EntityMediumView
          title={title}
          text={text}
          icon={typeIcon}
          typeName={basicInfo.typeName}
        />
      </PopoverContent>
    </Popover>
  )
})
NodeView.displayName = "NodeView";
export default NodeView;