"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { useLocale } from "next-intl"
import * as React from "react"

import { cn } from "@/lib/utils"

type LocaleType = "ar" | "en" | string
const HoverCardLocaleContext = React.createContext<LocaleType>("en")
const useHoverCardLocale = () => React.useContext(HoverCardLocaleContext)

const HoverCard = ({ children, ...props }: HoverCardPrimitive.HoverCardProps) => {
  const locale = useLocale()

  return (
    <HoverCardLocaleContext.Provider value={locale}>
      <HoverCardPrimitive.Root {...props}>
        {children}
      </HoverCardPrimitive.Root>
    </HoverCardLocaleContext.Provider>
  )
}

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {

  const locale = useHoverCardLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      dir={dir}
      className={cn(
        "z-50 w-64 rounded-xl border border-border/40 bg-popover/80 backdrop-blur-2xl p-4 text-popover-foreground shadow-2xl outline-none",
        "text-start",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
        className
      )}
      {...props}
    />
  )
})
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardContent, HoverCardTrigger }