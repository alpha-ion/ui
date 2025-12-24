"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/registry/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/registry/ui/popover"
import { Check, Search } from "lucide-react"
import * as React from "react"
import { useTranslations } from "next-intl"

const items = [
    { value: "egypt", label: "Egypt" },
    { value: "saudi", label: "Saudi Arabia" },
    { value: "uae", label: "United Arab Emirates" },
    { value: "qatar", label: "Qatar" },
    { value: "kuwait", label: "Kuwait" },
    { value: "oman", label: "Oman" },
    { value: "bahrain", label: "Bahrain" },
    { value: "jordan", label: "Jordan" },
    { value: "morocco", label: "Morocco" },
    { value: "tunisia", label: "Tunisia" },
    { value: "algeria", label: "Algeria" },
    { value: "turkey", label: "Turkey" }
]

export default function SmartSelectDemo() {
    const [open, setOpen] = React.useState(false)
    const [selectedCountry, setSelectedCountry] = React.useState("")
    const t = useTranslations("components.smartSelect.smartSelectDemo")
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[240px] justify-between"
                >
                    {selectedCountry
                        ? items.find((item) => item.value === selectedCountry)?.label
                        : t("selectPlaceholder")}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
                <Command>
                    <CommandInput placeholder={t("searchPlaceholder")} className="h-9" />
                    <CommandList>
                        <CommandEmpty>{t("noResults")}</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setSelectedCountry(currentValue === selectedCountry ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedCountry === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
