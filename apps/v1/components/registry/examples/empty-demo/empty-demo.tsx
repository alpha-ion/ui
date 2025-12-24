"use client"

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/registry/ui/empty"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/registry/ui/input-group"
import { Kbd } from "@/registry/ui/kbd"
import { SearchIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export default function EmptyDemo() {
    const t = useTranslations('components.empty.search');

    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle>
                    {t('title')}
                </EmptyTitle>
                <EmptyDescription>
                    {t('description')}
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <InputGroup className="w-3/4">
                    <InputGroupInput placeholder={t('inputPlaceholder')} />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <Kbd>/</Kbd>
                    </InputGroupAddon>
                </InputGroup>
                <EmptyDescription>
                    {t('helpText')} <a href="#">{t('contactSupport')}</a>
                </EmptyDescription>
            </EmptyContent>
        </Empty>
    )
}