"use client"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/registry/ui/input-group"
import { useTranslations } from "next-intl" 

export default function InputGroupTextDemo() {
    const t = useTranslations('components.inputGroup.textGroup'); 

    const remainingChars = 120;

    return (
        <div className="grid w-full max-w-sm gap-6">
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupText>EGP</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder={t('amountPlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>{t('currencySuffix')}</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder={t('urlPlaceholder')} className="!pl-0.5" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>.com</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder={t('usernamePlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>@company.com</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}