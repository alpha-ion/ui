"use client"

import * as React from "react"
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
import { Flag } from "lucide-react"

type Priority = {
    value: string
    label: string
    color: string
}

const priorities: Priority[] = [
    {
        value: "low",
        label: "منخفضة",
        color: "bg-blue-500",
    },
    {
        value: "medium",
        label: "متوسطة",
        color: "bg-yellow-500",
    },
    {
        value: "high",
        label: "عالية",
        color: "bg-orange-500",
    },
    {
        value: "urgent",
        label: "عاجلة",
        color: "bg-red-500",
    },
]

export default function SmartSelectPopoverDemo() {
    const [open, setOpen] = React.useState(false)
    const [selectedPriority, setSelectedPriority] = React.useState<Priority | null>(
        null
    )

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">الأولوية</span>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start gap-2">
                        {selectedPriority ? (
                            <>
                                <span className={`h-2 w-2 rounded-full ${selectedPriority.color}`} />
                                {selectedPriority.label}
                            </>
                        ) : (
                            <>+ تحديد الأولوية</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandInput placeholder="ابحث عن الأولوية..." />
                        <CommandList>
                            <CommandEmpty>لا توجد نتائج.</CommandEmpty>
                            <CommandGroup>
                                {priorities.map((priority) => (
                                    <CommandItem
                                        key={priority.value}
                                        value={priority.value}
                                        onSelect={(value) => {
                                            setSelectedPriority(
                                                priorities.find((p) => p.value === value) ||
                                                null
                                            )
                                            setOpen(false)
                                        }}
                                    >
                                        <span className={`mr-2 h-2 w-2 rounded-full ${priority.color}`} />
                                        {priority.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
