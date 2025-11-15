"use client"

import { Separator } from "@/registry/ui/separator"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

function ListItemGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            role="list"
            data-slot="list-item-group"
            className={cn(
                "group/list-item-group flex flex-col gap-1 rounded-2xl bg-background p-2",
                className
            )}
            {...props}
        />
    )
}

function ListItemSeparator({
    className,
    ...props
}: React.ComponentProps<typeof Separator>) {
    return (
        <Separator
            data-slot="list-item-separator"
            orientation="horizontal"
            weight="ultralight"
            className={cn("my-1.5 opacity-40", className)}
            {...props}
        />
    )
}

const listItemVariants = cva(
    "group/list-item relative flex items-center rounded-xl border border-transparent bg-transparent text-sm transition-all duration-200 outline-none hover:bg-accent/30 hover:border-accent/50 hover:shadow-sm focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:shadow-md [a]:transition-all [a]:duration-200",
    {
        variants: {
            variant: {
                default: "bg-transparent",
                outline:
                    "border-border/60 bg-background shadow-sm hover:shadow-md",
                elevated:
                    "border-transparent bg-background shadow-sm hover:shadow-lg hover:border-border/40",
                filled: "bg-muted/40 border-transparent hover:bg-muted/60",
            },
            size: {
                default: "px-5 py-4 gap-4",
                sm: "px-4 py-3 gap-3",
                lg: "px-6 py-5 gap-5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

interface ListItemProps
    extends React.ComponentProps<"div">,
        VariantProps<typeof listItemVariants> {
    asChild?: boolean
}

function ListItem({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    ...props
}: ListItemProps) {
    const Comp = asChild ? Slot : "div"
    return (
        <Comp
            data-slot="list-item"
            data-variant={variant}
            data-size={size}
            className={cn(listItemVariants({ variant, size, className }))}
            {...props}
        />
    )
}

const listItemMediaVariants = cva(
    "flex shrink-0 items-center justify-center group-has-[[data-slot=list-item-description]]/list-item:self-start group-has-[[data-slot=list-item-description]]/list-item:translate-y-0.5 [&_svg]:pointer-events-none transition-transform duration-200",
    {
        variants: {
            variant: {
                default: "bg-transparent",
                icon: "size-10 rounded-xl border border-border/40 bg-muted/30 [&_svg:not([class*='size-'])]:size-5 shadow-sm",
                image:
                    "size-12 rounded-xl overflow-hidden ring-1 ring-border/40 [&_img]:size-full [&_img]:object-cover shadow-sm",
                avatar:
                    "size-10 rounded-full overflow-hidden ring-2 ring-background [&_img]:size-full [&_img]:object-cover shadow-sm",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

interface ListItemMediaProps
    extends React.ComponentProps<"div">,
        VariantProps<typeof listItemMediaVariants> {}

function ListItemMedia({
    className,
    variant = "default",
    ...props
}: ListItemMediaProps) {
    return (
        <div
            data-slot="list-item-media"
            data-variant={variant}
            className={cn(listItemMediaVariants({ variant, className }))}
            {...props}
        />
    )
}

function ListItemContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="list-item-content"
            className={cn(
                "flex flex-1 flex-col gap-1.5 min-w-0",
                "[&+[data-slot=list-item-content]]:flex-none",
                className
            )}
            {...props}
        />
    )
}

function ListItemTitle({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="list-item-title"
            className={cn(
                "flex items-center gap-2 text-sm leading-snug font-semibold text-foreground",
                className
            )}
            {...props}
        />
    )
}

function ListItemDescription({
    className,
    ...props
}: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="list-item-description"
            className={cn(
                "text-muted-foreground line-clamp-2 text-sm leading-relaxed font-normal text-balance",
                "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-2 [&>a]:transition-colors",
                className
            )}
            {...props}
        />
    )
}

function ListItemActions({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="list-item-actions"
            className={cn(
                "flex items-center gap-2 shrink-0 opacity-0 group-hover/list-item:opacity-100 transition-opacity duration-200",
                className
            )}
            {...props}
        />
    )
}

function ListItemHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="list-item-header"
            className={cn(
                "flex basis-full items-center justify-between gap-3",
                className
            )}
            {...props}
        />
    )
}

function ListItemFooter({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="list-item-footer"
            className={cn(
                "flex basis-full items-center justify-between gap-3 mt-1 pt-2 border-t border-border/30",
                className
            )}
            {...props}
        />
    )
}

export {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemFooter,
    ListItemGroup,
    ListItemHeader,
    ListItemMedia,
    ListItemSeparator,
    ListItemTitle,
}

