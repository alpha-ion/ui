"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/registry/ui/hover-card"
import { useTranslations } from "next-intl"

export default function HoverCardDemo() {
    const t = useTranslations('components.hoverCard');

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">
                    {t('triggerText')}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                            {t('username')}
                        </h4>
                        <p className="text-sm">
                            {t('description')}
                        </p>
                        <div className="text-muted-foreground text-xs">
                            {t('joinedDate')}
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}