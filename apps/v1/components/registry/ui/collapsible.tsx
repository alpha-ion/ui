"use client"

import { cn } from "@/lib/utils"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { useLocale } from "next-intl"
import * as React from "react"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
    React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, ...props }, ref) => {
    const locale = useLocale()
    const dirValue = locale === "ar" ? "rtl" : "ltr"

    return (
        <CollapsiblePrimitive.CollapsibleTrigger
            ref={ref}
            dir={dirValue}
            className={cn(
                "flex items-center justify-between",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "disabled:cursor-not-allowed disabled:opacity-50",
                locale === "ar" && "flex-row-reverse",
                className
            )}
            {...props}
        />
    )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
    React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => {
    const locale = useLocale()
    const dirValue = locale === "ar" ? "rtl" : "ltr"

    return (
        <CollapsiblePrimitive.CollapsibleContent
            ref={ref}
            dir={dirValue}
            className={cn(
                "overflow-hidden transition-all duration-200 ease-out",
                "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
                locale === "ar" && "text-right ",
                className
            )}
            {...props}
        />
    )
})
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleContent, CollapsibleTrigger }