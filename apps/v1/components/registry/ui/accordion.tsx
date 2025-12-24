"use client"

import { cn } from "@/lib/utils"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { useLocale } from "next-intl"
import React, { createContext, useContext } from "react"
import { LuPlus } from "react-icons/lu"

type LocaleType = "ar" | "en" | string

const AccordionLocaleContext = createContext<LocaleType>("en")
const useAccordionLocale = () => useContext(AccordionLocaleContext)

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => {
  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <AccordionLocaleContext.Provider value={locale}>
      <AccordionPrimitive.Root
        ref={ref}
        dir={dir}
        className={cn("w-full", className)}
        {...props}
      />
    </AccordionLocaleContext.Provider>
  )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b overflow-hidden mb-2",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between rtl:flex-row-reverse px-6 py-4 text-base font-medium text-foreground transition-all group focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <div className="relative h-5 w-5 shrink-0">
          <LuPlus
            className={cn(
              "absolute h-5 w-5",
              "transition-transform duration-300",
              "group-data-[state=open]:rotate-45"
            )}
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const locale = useAccordionLocale()
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      dir={locale === "ar" ? "rtl" : "en"}
      {...props}
    >
      <div className="px-6 pb-6 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }