import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/app/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        amber: "bg-amber-50/90 shadow-sm hover:bg-amber-100/90 border",
        purple: "bg-purple-200/90 shadow-sm hover:bg-purple-100/90 border border-purple-600",
        red: "bg-red-50/90 shadow-sm hover:bg-red-100/90 border",
        green: "bg-green-50/90 shadow-sm hover:bg-green-100/90 border",
        blue: "bg-blue-200/90 shadow-sm hover:bg-blue-100/90 border border-blue-600",
        lime: "bg-lime-50/90 shadow-sm hover:bg-lime-100/90 border",
        cyan: "bg-cyan-50/90 shadow-sm hover:bg-cyan-100/90 border",
        teal: "bg-teal-50/90 shadow-sm hover:bg-teal-100/90 border",
        pink: "bg-pink-50/90 shadow-sm hover:bg-pink-100/90 border",
        indigo: "bg-indigo-50/90 shadow-sm hover:bg-indigo-100/90 border"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
