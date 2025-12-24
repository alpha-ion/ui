"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { arSA } from "date-fns/locale" 
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/registry/ui/popover"
import { useLocale, useTranslations } from "next-intl"

const convertToArabicDigits = (input: number | string): string => {
    const str = input.toString()
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
    return str.replace(/[0-9]/g, (w) => arabicDigits[+w])
}

export default function DatePickerRangeArabicDemo({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })

    const formatters = {
        formatDay: (day: Date) => convertToArabicDigits(day.getDate()),
    }
    const isRtl = useLocale() === "ar"
    const t = useTranslations('components.datePicker');
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-right font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon strokeWidth={2.1} className="ml-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <span className="font-normal w-full">
                                    {convertToArabicDigits(
                                        format(date.from,
                                            isRtl ?
                                                "dd LLL, y" :
                                                "dd LLLLLLLLLLL, y", { locale: arSA })
                                    )}{" "}
                                    -{" "}
                                    {convertToArabicDigits(
                                        format(date.to,
                                            isRtl ?
                                                "dd LLL, y" :
                                                "dd LLLLLLLLLLL, y", { locale: arSA })
                                    )}
                                </span>
                            ) : (
                                convertToArabicDigits(
                                    format(date.from,
                                        isRtl ?
                                            "dd LLL, y" :
                                            "dd LLLLLLLLLLL, y", { locale: arSA })
                                )
                            )
                        ) : (
                            <span className="font-normal">{t('chooseDateRange')}</span>
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
                        locale={arSA}
                        // dir="rtl"
                        formatters={formatters}
                        className="font-sans"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}