"use client"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from "@/registry/ui/input-group";
import { CheckIcon, InfoIcon, SearchIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function InputGroupMultipleAddonsDemo() {
    const t = useTranslations('components.inputGroup.multiAddon');

    return (
        <div className="grid w-full max-w-sm gap-6">
            <InputGroup>
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder={t('searchAmountPlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>{t('currencySuffix')}</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <CheckIcon />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon>
                    <InfoIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder={t('urlPlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>.com</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label={t('searchLabel')}
                    >
                        <SearchIcon />
                    </InputGroupButton>
                </InputGroupAddon>
                <InputGroupAddon>
                    <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder={t('usernamePlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <InputGroupText className="text-muted-foreground text-xs">
                        {t('resultCount', { count: 12 })}
                    </InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label={t('infoLabel')}
                    >
                        <InfoIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder={t('productSearchPlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <InputGroupText className="text-muted-foreground text-xs">
                        {t('itemCount', { count: 24 })}
                    </InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label={t('clearFiltersLabel')}
                    >
                        <XIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}