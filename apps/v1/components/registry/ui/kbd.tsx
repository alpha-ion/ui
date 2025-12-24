import { cn } from "@/lib/utils"
import * as React from "react"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
    return (
        <kbd
            data-slot="kbd"
            className={cn(
                "bg-muted/60 text-foreground pointer-events-none inline-flex h-6 w-fit min-w-6 items-center justify-center gap-1 rounded-lg px-2 font-sans text-xs font-medium select-none",
                "border border-border/40 shadow-sm",
                "[&_svg:not([class*='size-'])]:size-3",
                "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background [[data-slot=tooltip-content]_&]:border-background/40",
                "dark:[[data-slot=tooltip-content]_&]:bg-background/10",
                className
            )}
            {...props}
        />
    )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="kbd-group"
            className={cn("inline-flex items-center gap-1.5", className)}
            {...props}
        />
    )
}

export { Kbd, KbdGroup }
