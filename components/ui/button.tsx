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
        amber: "bg-amber-200/90 shadow-sm hover:bg-amber-100/90 shadow-md border",
        orange: "bg-orange-200/90 shadow-sm hover:bg-orange-100/90 shadow-md border",
        slate: "bg-slate-200/90 shadow-sm hover:bg-slate-100/90 shadow-md border",
        zinc: "bg-zinc-200/90 shadow-sm hover:bg-zinc-100/90 shadow-md border",
        neutral: "bg-neutral-200/90 shadow-sm hover:bg-neutral-100/90 shadow-md border",
        stone: "bg-stone-200/90 shadow-sm hover:bg-stone-100/90 shadow-md border",
        rose: "bg-rose-200/90 shadow-sm hover:bg-rose-100/90 shadow-md border",
        purple: "bg-purple-200/90 shadow-sm hover:bg-purple-100/90 shadow-md border",
        violet: "bg-violet-200/90 shadow-sm hover:bg-violet-100/90 shadow-md border",
        red: "bg-red-200/90 shadow-sm hover:bg-red-100/90 shadow-md border",
        green: "bg-green-200/90 shadow-sm hover:bg-green-100/90 shadow-md border",
        blue: "bg-blue-200/90 shadow-sm hover:bg-blue-100/90 shadow-md border",
        lime: "bg-lime-200/90 shadow-sm hover:bg-lime-100/90 shadow-md border",
        cyan: "bg-cyan-200/90 shadow-sm hover:bg-cyan-100/90 shadow-md border",
        teal: "bg-teal-200/90 shadow-sm hover:bg-teal-100/90 shadow-md border",
        pink: "bg-pink-200/90 shadow-sm hover:bg-pink-100/90 shadow-md border",
        indigo: "bg-indigo-200/90 shadow-sm hover:bg-indigo-100/90 shadow-md border",
        gray: "bg-gray-200/90 shadow-sm hover:bg-gray-100/90 shadow-md border",
        yellow: "bg-yellow-200/90 shadow-sm hover:bg-yellow-100/90 shadow-md border",
        sky: "bg-sky-200/90 shadow-sm hover:bg-sky-100/90 shadow-md border",
        fuchsia: "bg-fuchsia-200/90 shadow-sm hover:bg-fuchsia-100/90 shadow-md border",
        emerald: "bg-emerald-200/90 shadow-sm hover:bg-emerald-100/90 shadow-md border",
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
