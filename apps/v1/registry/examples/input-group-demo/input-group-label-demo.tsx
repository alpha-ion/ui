"use client"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/registry/ui/input-group"
import { Label } from "@/registry/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/registry/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { InfoIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export default function InputGroupLabelDemo() {
    const t = useTranslations('components.inputGroup.labelGroup');

    return (
        <div className="grid w-full max-w-sm gap-4">
            <InputGroup>
                <InputGroupInput id="email" placeholder={t('usernamePlaceholder')} />
                <InputGroupAddon>
                    <Label htmlFor="email">@</Label>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput id="email-2" placeholder={t('emailPlaceholder')} />
                <InputGroupAddon align="block-start">
                    <Label htmlFor="email-2" className="text-foreground">
                        {t('emailLabel')}
                    </Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InputGroupButton
                                    variant="ghost"
                                    aria-label={t('helpLabel')}
                                    className="ml-auto rounded-full"
                                    size="icon-xs"
                                >
                                    <InfoIcon />
                                </InputGroupButton>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('emailTip')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}