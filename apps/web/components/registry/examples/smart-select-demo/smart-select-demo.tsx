"use client"

import * as React from "react"
import { Check, Search } from "lucide-react"

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

const programmingLanguages = [
    {
        value: "javascript",
        label: "JavaScript",
    },
    {
        value: "typescript",
        label: "TypeScript",
    },
    {
        value: "python",
        label: "Python",
    },
    {
        value: "java",
        label: "Java",
    },
    {
        value: "go",
        label: "Go",
    },
    {
        value: "rust",
        label: "Rust",
    },
    {
        value: "php",
        label: "PHP",
    },
]

export default function SmartSelectDemo() {
    const [open, setOpen] = React.useState(false)
    const [selectedLanguage, setSelectedLanguage] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[240px] justify-between"
                >
                    {selectedLanguage
                        ? programmingLanguages.find((lang) => lang.value === selectedLanguage)?.label
                        : "اختر لغة البرمجة..."}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
                <Command>
                    <CommandInput placeholder="ابحث عن لغة..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>لا توجد لغة بهذا الاسم.</CommandEmpty>
                        <CommandGroup>
                            {programmingLanguages.map((language) => (
                                <CommandItem
                                    key={language.value}
                                    value={language.value}
                                    onSelect={(currentValue) => {
                                        setSelectedLanguage(currentValue === selectedLanguage ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {language.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedLanguage === language.value ? "opacity-100" : "opacity-0"
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
