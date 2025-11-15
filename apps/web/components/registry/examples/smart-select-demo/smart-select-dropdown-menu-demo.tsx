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

const productCategories = [
    "إلكترونيات",
    "ملابس",
    "أجهزة منزلية",
    "كتب",
    "ألعاب",
    "أثاث",
    "رياضة",
    "مواد غذائية",
]

export default function SmartSelectDropdownMenuDemo() {
    const [category, setCategory] = React.useState("إلكترونيات")
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex w-full flex-col items-start justify-between rounded-lg border bg-card px-4 py-3 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">منتج جديد</span>
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary">
                            {category}
                        </span>
                        جاهز للنشر
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
                    <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>إضافة صورة</DropdownMenuItem>
                        <DropdownMenuItem>تحديث السعر</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>تغيير التصنيف</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="p-0">
                                <Command>
                                    <CommandInput
                                        placeholder="ابحث عن تصنيف..."
                                        autoFocus={true}
                                        className="h-9"
                                    />
                                    <CommandList>
                                        <CommandEmpty>لا يوجد تصنيف بهذا الاسم.</CommandEmpty>
                                        <CommandGroup>
                                            {productCategories.map((cat) => (
                                                <CommandItem
                                                    key={cat}
                                                    value={cat}
                                                    onSelect={(value) => {
                                                        setCategory(value)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {cat}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            حذف المنتج
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
