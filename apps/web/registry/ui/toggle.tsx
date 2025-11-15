"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-medium text-sm tracking-tight",
    "transition-all duration-200 ease-out",
    "outline-none select-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-full",
          "bg-secondary/50 text-secondary-foreground",
          "hover:bg-secondary/70",
          "active:scale-95",
          "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
          "data-[state=on]:shadow-sm data-[state=on]:shadow-primary/20",
          "data-[state=on]:scale-100",
        ],
        outline: [
          "rounded-full",
          "border border-border/40 bg-background/60 backdrop-blur-sm",
          "shadow-xs",
          "hover:bg-accent/50 hover:border-border/60",
          "active:scale-95",
          "data-[state=on]:bg-primary/10 data-[state=on]:text-primary",
          "data-[state=on]:border-primary/50",
          "data-[state=on]:shadow-sm data-[state=on]:shadow-primary/10",
        ],
        ghost: [
          "rounded-full",
          "bg-transparent text-muted-foreground",
          "hover:bg-accent/50 hover:text-foreground",
          "active:scale-95",
          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        ],
        glass: [
          "rounded-full",
          "bg-background/40 backdrop-blur-xl",
          "border border-border/20",
          "shadow-sm",
          "hover:bg-background/60 hover:border-border/30",
          "active:scale-95",
          "data-[state=on]:bg-primary/90 data-[state=on]:text-primary-foreground",
          "data-[state=on]:border-primary/30",
          "data-[state=on]:shadow-md data-[state=on]:shadow-primary/20",
        ],
      },
      size: {
        sm: "h-7 px-2.5 min-w-7 text-xs",
        default: "h-8 px-3 min-w-8",
        lg: "h-9 px-3.5 min-w-9",
        xl: "h-10 px-4 min-w-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }