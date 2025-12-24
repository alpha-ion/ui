"use client"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/registry/ui/input-group"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/registry/ui/tooltip"
import { HelpCircle, InfoIcon } from "lucide-react"
import { useTranslations } from "next-intl" 

export default function InputGroupTooltipDemo() {
    const t = useTranslations('components.inputGroup.tooltipGroup');

    return (
        <div className="grid w-full max-w-sm gap-4">
            <InputGroup>
                <InputGroupInput placeholder={t('passwordPlaceholder')} type="password" />
                <InputGroupAddon align="inline-end">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InputGroupButton
                                    variant="ghost"
                                    aria-label={t('infoLabel')}
                                    size="icon-xs"
                                >
                                    <InfoIcon />
                                </InputGroupButton>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('passwordTip')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder={t('emailPlaceholder')} />
                <InputGroupAddon align="inline-end">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InputGroupButton
                                    variant="ghost"
                                    aria-label={t('helpLabel')}
                                    size="icon-xs"
                                >
                                    <HelpCircle />
                                </InputGroupButton>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('emailTip')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder={t('apiKeyPlaceholder')} />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <InputGroupAddon>
                                <InputGroupButton
                                    variant="ghost"
                                    aria-label={t('helpLabel')}
                                    size="icon-xs"
                                >
                                    <HelpCircle />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>{t('apiKeyTip')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </InputGroup>
        </div>
    )
}