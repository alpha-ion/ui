"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import { createContext, useContext } from "react"

import { cn } from "@/lib/utils"

type LocaleType = "ar" | "en" | string

const RadioGroupLocaleContext = createContext<LocaleType>("en")
const useRadioGroupLocale = () => useContext(RadioGroupLocaleContext)

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <RadioGroupLocaleContext.Provider value={locale}>
      <RadioGroupPrimitive.Root
        ref={ref}
        dir={dir}
        data-slot="radio-group"
        className={cn("grid gap-4", className)}
        {...props}
      />
    </RadioGroupLocaleContext.Provider>
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        "aspect-square h-5 w-5 shrink-0 rounded-full",
        "border-2 border-border/60 bg-background",
        "shadow-sm transition-all duration-200",
        "hover:border-border/80 hover:shadow",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:border-ring",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="h-2.5 w-2.5 fill-primary text-primary transition-all duration-200" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName


interface RadioGroupItemWithLabelProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label: string
  description?: string
}

const RadioGroupItemWithLabel = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemWithLabelProps
>(({ className, label, description, ...props }, ref) => {
  const locale = useRadioGroupLocale()

  return (
    <div className={cn(
      "flex items-start gap-3",
      "rtl:flex-row-reverse",
      className
    )}>
      <RadioGroupItem ref={ref} {...props} />
      <div className={cn(
        "flex flex-col gap-1",
        "rtl:text-right ltr:text-left"
      )}>
        <label
          htmlFor={props.id}
          className={cn(
            "text-sm font-medium leading-none cursor-pointer",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          )}
        >
          {label}
        </label>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
})
RadioGroupItemWithLabel.displayName = "RadioGroupItemWithLabel"

export { RadioGroup, RadioGroupItem, RadioGroupItemWithLabel }