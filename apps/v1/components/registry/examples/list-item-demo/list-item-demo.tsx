import { Button } from "@/registry/ui/button";
import {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemMedia,
    ListItemTitle,
} from "@/registry/ui/list-item";
import { BadgeCheckIcon, ChevronRightIcon, SparklesIcon } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ListItemDemo() {
    const t = useTranslations('components.listItems.listItemDemo');

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <ListItem variant="outline">
                <ListItemContent>
                    <ListItemTitle>{t('aiAssistantTitle')}</ListItemTitle>
                    <ListItemDescription>
                        {t('aiAssistantDescription')}
                    </ListItemDescription>
                </ListItemContent>
                <ListItemActions>
                    <Button size="sm" variant="default">
                        {t('activateButton')}
                    </Button>
                </ListItemActions>
            </ListItem>
            <ListItem variant="elevated" size="sm" asChild>
                <a href="#">
                    <ListItemMedia variant="icon">
                        <BadgeCheckIcon className="size-5 text-green-600" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>{t('devReadyTitle')}</ListItemTitle>
                        <ListItemDescription>
                            {t('devReadyDescription')}
                        </ListItemDescription>
                    </ListItemContent>
                    <ListItemActions>
                        <ChevronRightIcon className="size-4 text-muted-foreground rtl:-rotate-180" />
                    </ListItemActions>
                </a>
            </ListItem>
            <ListItem variant="filled" asChild>
                <a href="#">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>{t('newFeaturesTitle')}</ListItemTitle>
                        <ListItemDescription>
                            {t('newFeaturesDescription')}
                        </ListItemDescription>
                    </ListItemContent>
                </a>
            </ListItem>
        </div>
    )
}