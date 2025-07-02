import React from "react";

import { DivLabelColorClassNameMapping } from "@/app/types/color-mode";
import BaseContextMenu from "../basic/context-menu";
import { useAppStore } from "@/app/store";
import { BaseEntityProps } from "./entity.type";
import { cn } from "@/app/lib/utils";


export interface EntityLabelProps extends BaseEntityProps {
  label: string;
  onLabelChange?: (value: string) => void;
}


const EntityLabel = React.forwardRef<
  HTMLDivElement,
  EntityLabelProps
>(({
  nodeId,
  label,
  icon,
  className,
  children,
  ...props
}, ref) => {
  const focusNode = useAppStore((state) => state.focusNode);

  const handleClick = () => {
    console.log("clicked");
  }
  const color = 'stone';
  const defaultClName = 'relative flex max-w-[400px] rounded-xl px-4 py-2 text-base space-x-2 break-words whitespace-normal text-left shadow-none border-none ' + DivLabelColorClassNameMapping[color];
  const childClassName = 'flex flex-row justify-start gap-2 items-center'

  const main = (
    <div
      ref={ref}
      className={cn(defaultClName, className)}
      {...props}
    >
      <div
        className={childClassName}
        onClick={handleClick}
      >
        {icon}
        <span className="">{label}</span>
      </div>
      {children}
    </div>
  )

  if (!nodeId) {
    return main;
  }

  const options = [
    {
      label: 'Explore',
      onSelect: () => focusNode(nodeId)
    }
  ]

  return (
    <BaseContextMenu wrappedElement={main} options={options} />
  )
})
EntityLabel.displayName = "EntityLabel";

export default EntityLabel;