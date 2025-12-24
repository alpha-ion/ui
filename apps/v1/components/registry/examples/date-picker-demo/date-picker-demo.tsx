"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import * as React from "react"
import { DateRange } from "react-day-picker"


export default function DatePickerRangeDemo() {
  const t = useTranslations('components.datePicker');
  const isRtl = useLocale() === "ar"

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-start font-normal",
            !date?.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="me-2 h-4 w-4 rtl:ms-2 rtl:me-0" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span className="font-normal">{t('rangePlaceholder')}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}