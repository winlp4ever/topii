import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardLabel, CardLabelTitle } from "../ui/card";
import MarkdownView from "../markdown-view";
import { BaseEntityProps } from "./entity.type";
import React from "react";
import { cn } from "@/app/lib/utils";
import TiptapMarkdownEditor from "../editor/MarkdownEditor";


export interface EntityMediumViewProps extends BaseEntityProps {
  title: string;
  text: string;
  onTitleChange?: (value: string) => void;
  onTextChange?: (value: string) => void;
}


const EntityMediumView = React.forwardRef<
  HTMLDivElement,
  EntityMediumViewProps
>(({ title, text, icon, typeName, className }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn('w-[400px]', className)}
    >
      <CardLabel className="bg-transparent">
        <CardLabelTitle className="bg-transparent">
          {icon}
          <span
            className='font-medium text-xs'
          >
            {typeName}
          </span>
        </CardLabelTitle>
      </CardLabel>
      <CardHeader className='pt-2 text-left'>
        <CardTitle className='text-lg'>{title}</CardTitle>
        <CardDescription className='[&_*_li]:mt-2 text-zinc-700'>
          <TiptapMarkdownEditor markdown={text} />
        </CardDescription>
      </CardHeader>
    </Card>
  );
})
EntityMediumView.displayName = "EntityMediumView";
export default EntityMediumView;