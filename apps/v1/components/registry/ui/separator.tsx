"use client"

import { cn } from "@/lib/utils"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as React from "react"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    weight?: "ultralight" | "light" | "regular"
  }
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      weight = "regular",
      ...props
    },
    ref
  ) => {
    const weightStyles = {
      ultralight: "opacity-30",
      light: "opacity-50",
      regular: "opacity-100",
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          weightStyles[weight],
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }