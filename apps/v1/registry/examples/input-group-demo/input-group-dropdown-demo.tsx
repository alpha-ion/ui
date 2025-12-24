// 📄 InputGroupDropdownDemo.tsx

"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/registry/ui/input-group"
import { ChevronDownIcon, MoreHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"

export default function InputGroupDropdownDemo() {
    const t = useTranslations('components.inputGroup.dropdownGroup');

    return (
        <div className="grid w-full max-w-sm gap-4">
            <InputGroup>
                <InputGroupInput placeholder={t('fileNamePlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <InputGroupButton
                                variant="ghost"
                                aria-label={t('moreLabel')}
                                size="icon-xs"
                            >
                                <MoreHorizontal />
                            </InputGroupButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>{t('settingsItem')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('copyPathItem')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('openLocationItem')}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup className="[--radius:1rem]">
                <InputGroupInput placeholder={t('searchQueryPlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <InputGroupButton variant="ghost" className="!pr-1.5 text-xs">
                                {t('searchInButton')} <ChevronDownIcon className="size-3" />
                            </InputGroupButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="[--radius:0.95rem]">
                            <DropdownMenuItem>{t('documentationItem')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('blogPostsItem')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('changelogItem')}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}