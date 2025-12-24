"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"

const workspaces = [
    { value: "vision-os", label: "VisionOS Lab", description: "Spatial design system" },
    { value: "arcadia", label: "Arcadia Research", description: "Machine learning prototypes" },
    { value: "lumen", label: "Project Lumen", description: "Health insights dashboard" },
    { value: "atlas", label: "Atlas Cloud", description: "Infrastructure automation" },
]

export default function CommandComboboxDemo() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("vision-os")

    const selectedWorkspace = workspaces.find((workspace) => workspace.value === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    aria-expanded={open}
                    className="flex w-72 items-center justify-between rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/0 px-4 py-3 text-left text-sm text-white shadow-[0_15px_30px_-20px_rgba(0,0,0,0.8)] transition hover:border-white/30"
                >
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Workspace</p>
                        <p className="font-semibold text-white">
                            {selectedWorkspace ? selectedWorkspace.label : "Select workspace"}
                        </p>
                        <p className="text-xs text-white/60">{selectedWorkspace?.description}</p>
                    </div>
                    <ChevronsUpDown className="h-4 w-4 text-white/60" />
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 border-0 bg-transparent p-0 shadow-none">
                <Command className="w-full border border-white/10">
                    <CommandInput placeholder="Search workspace..." />
                    <CommandList>
                        <CommandEmpty>No workspace found.</CommandEmpty>
                        <CommandGroup heading="All workspaces">
                            {workspaces.map((workspace) => (
                                <CommandItem
                                    key={workspace.value}
                                    value={workspace.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <div className="flex flex-col text-left">
                                        <span className="text-sm font-medium">{workspace.label}</span>
                                        <span className="text-xs text-white/60">{workspace.description}</span>
                                    </div>
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4 text-emerald-400 transition-opacity",
                                            value === workspace.value ? "opacity-100" : "opacity-0"
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

