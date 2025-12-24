"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ar, enUS } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import { createContext, useContext } from "react"
import { DayPicker } from "react-day-picker"

type LocaleType = "ar" | "en" | string

const CalendarLocaleContext = createContext<LocaleType>("en")
const useCalendarLocale = () => useContext(CalendarLocaleContext)

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale: propLocale,
  dir: propDir,
  ...props
}: CalendarProps) {
  const contextLocale = useLocale()

  const finalLocale = propLocale || (contextLocale === "ar" ? ar : enUS)
  const finalDir = propDir || (contextLocale === "ar" ? "rtl" : "ltr")

  return (
    <CalendarLocaleContext.Provider value={contextLocale}>
      <CalendarContent
        className={className}
        classNames={classNames}
        showOutsideDays={showOutsideDays}
        locale={finalLocale}
        dir={finalDir}
        {...props}
      />
    </CalendarLocaleContext.Provider>
  )
}
Calendar.displayName = "Calendar"

function CalendarContent({
  className,
  classNames,
  showOutsideDays = true,
  locale: propLocale,
  dir: propDir,
  ...props
}: CalendarProps) {
  const contextLocale = useCalendarLocale()

  const isRTL = propDir === "rtl" || (contextLocale === "ar" && !propDir)
  const dirValue = propDir || (contextLocale === "ar" ? "rtl" : "ltr")

  const dateLocale = propLocale || (contextLocale === "ar" ? ar : enUS)

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={dateLocale}
      dir={dirValue}
      className={cn(
        "p-4",
        "bg-white/20 backdrop-blur-sm",
        "border border-border/50",
        "rounded-2xl",
        "shadow-lg shadow-foreground/5",
        "transition-all duration-200",
        className
      )}
      classNames={{
        months: cn(
          "flex flex-col sm:flex-row",
          "space-y-4 sm:space-y-0",
          !isRTL && "sm:space-x-4",
          isRTL && "sm:gap-4"
        ),
        month: "space-y-4",
        caption: cn(
          "flex justify-center pt-1 relative items-center",
          "h-10"
        ),
        caption_label: cn(
          "text-sm font-semibold text-foreground",
          "tracking-tight"
        ),
        nav: cn(
          "flex items-center",
          !isRTL && "space-x-1",
          isRTL && "gap-1"
        ),
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0",
          "bg-secondary/50 hover:bg-secondary",
          "text-muted-foreground hover:text-foreground",
          "rounded-full",
          "transition-all duration-200",
          "hover:scale-105 active:scale-95"
        ),
        nav_button_previous: cn(
          "absolute",
          !isRTL && "left-1",
          isRTL && "right-1"
        ),
        nav_button_next: cn(
          "absolute",
          !isRTL && "right-1",
          isRTL && "left-1"
        ),
        table: "w-full border-collapse",
        head_row: "flex justify-between mb-1",
        head_cell: cn(
          "w-9 h-9",
          "flex items-center justify-center",
          "text-xs font-medium text-muted-foreground",
          "uppercase tracking-wider"
        ),
        row: "flex w-full justify-between mt-1",
        cell: cn(
          "relative p-0 text-center text-sm",
          "focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-accent/50",
          "[&:has([aria-selected])]:rounded-lg",
          "[&:has([aria-selected].day-outside)]:bg-accent/30",
          props.mode === "range"
            ? cn(
              !isRTL && "[&:has(>.day-range-end)]:rounded-r-lg",
              !isRTL && "[&:has(>.day-range-start)]:rounded-l-lg",
              !isRTL && "first:[&:has([aria-selected])]:rounded-l-lg",
              !isRTL && "last:[&:has([aria-selected])]:rounded-r-lg",
              isRTL && "[&:has(>.day-range-end)]:rounded-l-lg",
              isRTL && "[&:has(>.day-range-start)]:rounded-r-lg",
              isRTL && "first:[&:has([aria-selected])]:rounded-r-lg",
              isRTL && "last:[&:has([aria-selected])]:rounded-l-lg"
            )
            : "[&:has([aria-selected])]:rounded-lg"
        ),
        day: cn(
          "h-9 w-9 p-0",
          "flex items-center justify-center",
          "text-sm font-medium text-foreground",
          "rounded-full",
          "transition-all duration-200",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 hover:text-primary-foreground",
          "focus:bg-primary focus:text-primary-foreground",
          "shadow-sm"
        ),
        day_today: cn(
          "bg-accent text-accent-foreground",
          "font-bold",
          "ring-1 ring-border"
        ),
        day_outside: cn(
          "day-outside",
          "text-muted-foreground/50",
          "aria-selected:bg-accent/30",
          "aria-selected:text-muted-foreground"
        ),
        day_disabled: cn(
          "text-muted-foreground/30",
          "cursor-not-allowed"
        ),
        day_range_middle: cn(
          "aria-selected:bg-accent",
          "aria-selected:text-accent-foreground",
          "rounded-none"
        ),
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className: iconClassName, ...iconProps }) =>
          isRTL ? (
            <ChevronRight
              className={cn("h-4 w-4", iconClassName)}
              strokeWidth={2}
              {...iconProps}
            />
          ) : (
            <ChevronLeft
              className={cn("h-4 w-4", iconClassName)}
              strokeWidth={2}
              {...iconProps}
            />
          ),
        IconRight: ({ className: iconClassName, ...iconProps }) =>
          isRTL ? (
            <ChevronLeft
              className={cn("h-4 w-4", iconClassName)}
              strokeWidth={2}
              {...iconProps}
            />
          ) : (
            <ChevronRight
              className={cn("h-4 w-4", iconClassName)}
              strokeWidth={2}
              {...iconProps}
            />
          ),
      }}
      {...props}
    />
  )
}
CalendarContent.displayName = "CalendarContent"

export { Calendar }