"use client"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/registry/ui/command"
import {
    BellRing,
    Calculator,
    Calendar,
    Camera,
    Clipboard,
    Compass,
    CreditCard,
    FileText,
    FolderOpen,
    Laptop,
    Mail,
    MessageSquare,
    MoonStar,
    Rocket,
    Search,
    Settings,
    Smile,
    SunMedium,
    User
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import * as React from "react"

export default function CommandDemo() {
    const t = useTranslations("components.command")
    const locale = useLocale()
    const isRTL = locale === "ar"
    const [selection, setSelection] = React.useState<string | null>(null)

    // ... (Data definitions remain same)
    const quickActions = [
        { icon: SunMedium, label: t("lightMode"), shortcut: "⌘ ⇧ L", category: "theme" },
        { icon: MoonStar, label: t("darkMode"), shortcut: "⌘ ⇧ D", category: "theme" },
        { icon: BellRing, label: t("snooze"), shortcut: "⌘ S", category: "notifications" },
        { icon: Search, label: t("search"), shortcut: "⌘ K", category: "actions" },
    ]

    const workspaces = [
        { icon: Compass, label: t("productStrategy"), shortcut: "⌘ 1", badge: "3" },
        { icon: Rocket, label: t("launchChecklist"), shortcut: "⌘ 2", badge: "7" },
        { icon: Laptop, label: t("designSystems"), shortcut: "⌘ 3" },
        { icon: FileText, label: t("documentation"), shortcut: "⌘ 4" },
    ]

    const apps = [
        { icon: Calendar, label: t("calendar"), shortcut: "⌘ C" },
        { icon: Mail, label: t("mail"), shortcut: "⌘ M" },
        { icon: MessageSquare, label: t("messages"), shortcut: "⌘ T" },
        { icon: Calculator, label: t("calculator"), shortcut: "⌘ A" },
    ]

    const recent = [
        { icon: FileText, label: t("quarterlyReport"), time: t("minutes", { count: 5 }) },
        { icon: FolderOpen, label: t("projectFiles"), time: t("hours", { count: 2 }) },
        { icon: Camera, label: t("screenshots"), time: t("yesterday") },
    ]

    const handleSelect = (label: string) => {
        setSelection(label)
        console.log(`Selected: ${label}`)
    }

    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            {/* SHADCN ARCHITECTURE NOTE:
                - We replace hardcoded colors with semantic tokens.
                - bg-popover: Handles the background in both modes automatically.
                - text-popover-foreground: Ensures text is readable against the background.
                - border-border: Uses the correct border color for each mode.
            */}
            <Command
                className={cn(
                    "rounded-xl border border-border shadow-2xl",
                    "bg-popover text-popover-foreground", // Critical for Dark/Light adaptability
                    "overflow-hidden"
                )}
                dir={isRTL ? "rtl" : "ltr"}
            >
                <CommandInput
                    placeholder={t("searchPlaceholder")}
                    className="h-12 border-b border-border/50"
                />
                <CommandList className="max-h-[400px] p-2">
                    <CommandEmpty className="py-6 text-center text-sm">
                        <div className="flex flex-col items-center gap-2">
                            <Search className="h-8 w-8 text-muted-foreground/50" />
                            <p className="text-muted-foreground">{t("noResults")}</p>
                        </div>
                    </CommandEmpty>

                    {/* Recent Section */}
                    <CommandGroup heading={t("recent")}>
                        {recent.map((item) => (
                            <CommandItem
                                key={item.label}
                                onSelect={() => handleSelect(item.label)}
                                className="gap-3 rounded-sm aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                                <item.icon className="h-4 w-4 text-muted-foreground" />
                                <div className="flex flex-1 items-center justify-between">
                                    <span>{item.label}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {item.time}
                                    </span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator className="my-2 bg-border/50" />

                    {/* Quick Actions */}
                    <CommandGroup heading={t("quickActions")}>
                        {quickActions.map((action) => (
                            <CommandItem
                                key={action.label}
                                onSelect={() => handleSelect(action.label)}
                                className="gap-3 rounded-sm aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                                <action.icon className="h-4 w-4 text-muted-foreground" />
                                <span className="flex-1">{action.label}</span>
                                <CommandShortcut className="text-muted-foreground/70">{action.shortcut}</CommandShortcut>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator className="my-2 bg-border/50" />

                    {/* Workspaces */}
                    <CommandGroup heading={t("workspaces")}>
                        {workspaces.map((space) => (
                            <CommandItem
                                key={space.label}
                                onSelect={() => handleSelect(space.label)}
                                className="gap-3 rounded-sm aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                                <space.icon className="h-4 w-4 text-muted-foreground" />
                                <span className="flex-1">{space.label}</span>
                                {space.badge && (
                                    // bg-primary works in both modes (Black in light, White in dark)
                                    // text-primary-foreground ensures contrast (White in light, Black in dark)
                                    <span className="flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                                        {space.badge}
                                    </span>
                                )}
                                <CommandShortcut className="text-muted-foreground/70">{space.shortcut}</CommandShortcut>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator className="my-2 bg-border/50" />

                    {/* Apps */}
                    <CommandGroup heading={t("apps")}>
                        {apps.map((app) => (
                            <CommandItem
                                key={app.label}
                                onSelect={() => handleSelect(app.label)}
                                className="gap-3 rounded-sm aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                                <app.icon className="h-4 w-4 text-muted-foreground" />
                                <span className="flex-1">{app.label}</span>
                                <CommandShortcut className="text-muted-foreground/70">{app.shortcut}</CommandShortcut>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator className="my-2 bg-border/50" />

                    {/* Settings */}
                    <CommandGroup heading={t("settings")}>
                        <CommandItem onSelect={() => handleSelect("Profile")} className="gap-3 rounded-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="flex-1">{t("profile")}</span>
                            <CommandShortcut className="text-muted-foreground/70">⌘ P</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect("Billing")} className="gap-3 rounded-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="flex-1">{t("billing")}</span>
                            <CommandShortcut className="text-muted-foreground/70">⌘ B</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => handleSelect("Settings")} className="gap-3 rounded-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span className="flex-1">{t("settingsMenu")}</span>
                            <CommandShortcut className="text-muted-foreground/70">⌘ ,</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>

            {/* Status Bar Component */}
            <div
                className={cn(
                    // Uses bg-muted/50 for a subtle background difference
                    "rounded-lg border border-border bg-muted/50 p-4",
                    "backdrop-blur-sm"
                )}
                dir={isRTL ? "rtl" : "ltr"}
            >
                <div className="flex items-center gap-3">
                    {selection ? (
                        <>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <Smile className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{t("lastAction")}</p>
                                <p className="text-xs text-muted-foreground">{selection}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border/50 shadow-sm">
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{t("trySearching")}</p>
                                <p className="text-xs text-muted-foreground">
                                    {t("pressK")}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Pro Tip Component 
                This was the biggest issue in the old code.
                Fixed by removing 'blue' and using 'primary' tokens.
            */}
            <div
                className={cn(
                    "rounded-lg border p-4",
                    // Border is primary with low opacity
                    "border-primary/20",
                    // Background is primary with very low opacity (tinted)
                    "bg-primary/5",
                    "text-start"
                )}
                dir={isRTL ? "rtl" : "ltr"}
            >
                <div className="flex gap-3">
                    <div className="mt-0.5">
                        <Clipboard className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                            {t("proTip")}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {t("proTipText")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}