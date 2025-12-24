"use client"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/registry/ui/input-group";
import {
    CheckIcon,
    CreditCardIcon,
    InfoIcon,
    MailIcon,
    SearchIcon,
    StarIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function InputGroupIconDemo() {
    const t = useTranslations('components.inputGroup.iconGroup');

    return (
        <div className="grid w-full max-w-sm gap-6">
            <InputGroup>
                <InputGroupInput placeholder={t('searchPlaceholder')} />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput type="email" placeholder={t('emailPlaceholder')} />
                <InputGroupAddon>
                    <MailIcon />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder={t('cardNumberPlaceholder')} />
                <InputGroupAddon>
                    <CreditCardIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <CheckIcon />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder={t('cardNumberPlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <StarIcon />
                    <InfoIcon />
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}