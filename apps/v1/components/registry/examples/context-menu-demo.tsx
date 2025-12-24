"use client"

import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/registry/ui/context-menu";
import { useTranslations } from "next-intl";

export default function ContextMenuDemo() {
    const t = useTranslations('components.contextMenu');

    return (
        <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                {t('trigger')}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
                <ContextMenuItem inset>
                    {t('back')}
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset disabled>
                    {t('forward')}
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset>
                    {t('reload')}
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger inset>{t('moreTools')}</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-44">
                        <ContextMenuItem>{t('savePage')}</ContextMenuItem>
                        <ContextMenuItem>{t('createShortcut')}</ContextMenuItem>
                        <ContextMenuItem>{t('nameWindow')}</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>{t('developerTools')}</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem className="text-destructive focus:text-destructive">{t('delete')}</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked>
                    {t('showBookmarks')}
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>
                    {t('showFullUrls')}
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuRadioGroup value="pedro">
                    <ContextMenuLabel inset>{t('peopleLabel')}</ContextMenuLabel>
                    <ContextMenuRadioItem value="pedro">
                        {t('namePedro')}
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value="colm">
                        {t('nameColm')}
                    </ContextMenuRadioItem>
                </ContextMenuRadioGroup>
            </ContextMenuContent>
        </ContextMenu>
    )
}