"use client"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/registry/ui/input-group"
import { Loading } from "@/registry/ui/loading"
import { LoaderIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export default function InputGroupLoading() {
    const t = useTranslations('components.inputGroup.loadingGroup');

    return (
        <div className="grid w-full max-w-sm gap-4">
            <InputGroup data-disabled>
                <InputGroupInput placeholder={t('searchingPlaceholder')} disabled />
                <InputGroupAddon align="inline-end">
                    <Loading />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup data-disabled>
                <InputGroupInput placeholder={t('processingPlaceholder')} disabled />
                <InputGroupAddon>
                    <Loading />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup data-disabled>
                <InputGroupInput placeholder={t('savingPlaceholder')} disabled />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>{t('savingText')}</InputGroupText>
                    <Loading />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup data-disabled>
                <InputGroupInput placeholder={t('refreshingPlaceholder')} disabled />
                <InputGroupAddon>
                    <LoaderIcon className="animate-spin" />
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}