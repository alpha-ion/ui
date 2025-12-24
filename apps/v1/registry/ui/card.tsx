"use client"

import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import * as React from "react"
import { createContext, useContext } from "react"

type LocaleType = "ar" | "en" | string

const CardLocaleContext = createContext<LocaleType>("en")
const useCardLocale = () => useContext(CardLocaleContext)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <CardLocaleContext.Provider value={locale}>
      <div
        ref={ref}
        dir={dir}
        className={cn(
          "rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-border/80",
          className
        )}
        {...props}
      />
    </CardLocaleContext.Provider>
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6 pb-4",
      "text-start",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "font-semibold leading-tight tracking-tight text-foreground",
      "text-start",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground",
      "text-start",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-6 pt-0 text-sm leading-relaxed",
      "text-start",
      className
    )}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 p-6 pt-4 border-t border-border/30",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }