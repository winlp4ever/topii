import { cn } from "@/app/lib/utils"
import React from "react"

// card label component
export const CardLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "items-center gap-2 relative z-20 flex justify-start bg-card px-3 py-2.5 text-card-foreground",
      className
    )}
    {...props}
  />
))
CardLabel.displayName = "Card"

// card label title component
export const CardLabelTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-1.5 pl-1 text-[13px] text-muted-foreground [&>svg]:h-[0.9rem] [&>svg]:w-[0.9rem]", className)}
    {...props}
  />
))
CardLabelTitle.displayName = "CardLabelTitle"