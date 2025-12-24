"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/registry/ui/command"
import {
    Calendar,
    CreditCard,
    Laptop,
    Search,
    Settings,
    UserRound
} from "lucide-react"
import { useTranslations } from "next-intl"; // Import i18n hook
import * as React from "react"

export default function CommandDialogDemo() {
    // 1. Hook into the translation dictionary
    const t = useTranslations("components.commandDialog")

    const [open, setOpen] = React.useState(false)
    const [lastAction, setLastAction] = React.useState<string>("")

    // Toggle Logic
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    // Helper for feedback
    const handleSelect = (labelKey: string) => {
        // In a real app, this acts as a router or action dispatcher
        runCommand(() => setLastAction(t(labelKey)))
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {/* CRITICAL FIX:
         Removed hardcoded 'text-white', 'border-white'.
         Used 'text-muted-foreground' and 'bg-muted/50'.
         This ensures it looks premium in Dark Mode AND clean in Light Mode.
      */}
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className={cn(
                    "relative h-12 w-full max-w-[280px] justify-start rounded-[0.75rem] text-sm text-muted-foreground sm:pr-12",
                    "bg-muted/20 border-muted-foreground/20 hover:bg-muted/40 shadow-sm backdrop-blur-sm"
                )}
            >
                <span className="inline-flex items-center gap-2 truncate">
                    <Search className="h-4 w-4 opacity-50" />
                    {t("searchPlaceholder")}
                </span>
                <kbd className="pointer-events-none absolute right-2 top-[10px] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>

            {/* Feedback Area */}
            {lastAction && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                    <p className="text-sm text-muted-foreground">
                        {t("lastActionPrefix")} <span className="font-semibold text-foreground">{lastAction}</span>
                    </p>
                </div>
            )}

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder={t("inputPlaceholder")} />
                <CommandList>
                    <CommandEmpty>{t("noResults")}</CommandEmpty>

                    <CommandGroup heading={t("groups.suggestions")}>
                        <CommandItem onSelect={() => handleSelect("actions.catchUp")}>
                            <UserRound className="mr-2 h-4 w-4" />
                            <span>{t("actions.catchUp")}</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect("actions.calendar")}>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{t("actions.calendar")}</span>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect("actions.marketing")}>
                            <Laptop className="mr-2 h-4 w-4" />
                            <span>{t("actions.marketing")}</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading={t("groups.settings")}>
                        <CommandItem onSelect={() => handleSelect("actions.profile")}>
                            <UserRound className="mr-2 h-4 w-4" />
                            <span>{t("actions.profile")}</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect("actions.billing")}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>{t("actions.billing")}</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect("actions.settings")}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>{t("actions.settings")}</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}