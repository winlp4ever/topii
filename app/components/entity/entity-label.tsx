import React from "react";

import { ColorMode } from "@/app/types/color-mode";
import BaseContextMenu from "../basic/context-menu";
import { useAppStore } from "@/app/store";
import { BaseEntityProps } from "./entity.type";
import { cn } from "@/app/lib/utils";


export interface EntityLabelProps extends BaseEntityProps {
  label: string;
  onLabelChange?: (value: string) => void;
  colorMode?: ColorMode;
}


export const DivLabelColorClassNameMapping: Record<ColorMode, string> = {
  stone: "bg-stone-100 text-stone-900",
  slate: "bg-slate-100 text-slate-900",
  gray: "bg-gray-100 text-gray-900",
  zinc: "bg-zinc-100 text-zinc-900",
  neutral: "bg-neutral-100 text-neutral-900",
  amber: "bg-amber-100 text-amber-900",
  orange: "bg-orange-100 text-orange-900",
  emerald: "bg-emerald-100 text-emerald-900",
  lime: "bg-lime-100 text-lime-900",
  green: "bg-green-100 text-green-900",
  teal: "bg-teal-100 text-teal-900",
  cyan: "bg-cyan-100 text-cyan-900",
  sky: "bg-sky-100 text-sky-900",
  blue: "bg-blue-100 text-blue-900",
  violet: "bg-violet-100 text-violet-900",
  purple: "bg-purple-100 text-purple-900",
  fuchsia: "bg-fuchsia-100 text-fuchsia-900",
  pink: "bg-pink-100 text-pink-900",
  rose: "bg-rose-100 text-rose-900",
  red: "bg-red-100 text-red-900",
  indigo: "bg-indigo-100 text-indigo-900",
  yellow: "bg-yellow-100 text-yellow-900",
  transparent: "bg-stone-50 text-stone-900",
}


const EntityLabel = React.forwardRef<
  HTMLDivElement,
  EntityLabelProps
>(({ nodeId, label, icon, colorMode, className }, ref) => {
  const focusNode = useAppStore((state) => state.focusNode);

  const handleClick = () => {
    console.log("clicked");
  }
  const color = colorMode || 'stone';
  const clName = 'flex flex-row justify-start gap-2 items-center rounded-xl px-4 py-2 text-base space-x-2 break-words whitespace-normal h-auto text-left shadow-none border-none ' + DivLabelColorClassNameMapping[color];


  const main = (
    <div
      ref={ref}
      className={cn("relative flex bg-transparent max-w-[400px]", className)}
    >
      <div
        className={clName}
        onClick={handleClick}
      >
        {icon}
        <span className="">{label}</span>
      </div>
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