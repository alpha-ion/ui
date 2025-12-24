"use client"

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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { MoreHorizontal, Tag } from "lucide-react"
import * as React from "react"
import { useTranslations } from "next-intl"

export default function SmartSelectDropdownMenuDemo() {
    const t = useTranslations("components.smartSelect.smartSelectDropdownMenuDemo")

    const categories = [
        { key: "electronics", label: t("categories.electronics") },
        { key: "apparel", label: t("categories.apparel") },
        { key: "homeAppliances", label: t("categories.homeAppliances") },
        { key: "books", label: t("categories.books") },
        { key: "toys", label: t("categories.toys") },
        { key: "furniture", label: t("categories.furniture") },
        { key: "sports", label: t("categories.sports") },
        { key: "groceries", label: t("categories.groceries") },
    ]

    const [category, setCategory] = React.useState(categories[0].label)
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex w-full flex-col items-start justify-between rounded-lg border bg-card px-4 py-3 shadow-sm sm:flex-row sm:items-center max-w-md">
            <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                        {t("productTitle")}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary">
                            {category}
                        </span>
                        {t("productStatus")}
                    </span>
                </div>
            </div>

            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[220px]">
                    <DropdownMenuLabel>{t("menuLabel")}</DropdownMenuLabel>

                    <DropdownMenuGroup>
                        <DropdownMenuItem>{t("menuItemAddImage")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("menuItemUpdatePrice")}</DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                {t("menuSubTrigger")}
                            </DropdownMenuSubTrigger>

                            <DropdownMenuSubContent className="p-0">
                                <Command>
                                    <CommandInput
                                        placeholder={t("commandPlaceholder")}
                                        autoFocus={true}
                                        className="h-9"
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            {t("commandEmpty")}
                                        </CommandEmpty>

                                        <CommandGroup>
                                            {categories.map((cat) => (
                                                <CommandItem
                                                    key={cat.key}
                                                    value={cat.label}
                                                    onSelect={() => {
                                                        setCategory(cat.label)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {cat.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive">
                            {t("menuItemDelete")}
                            <DropdownMenuShortcut>
                                {t("menuShortcutDelete")}
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
