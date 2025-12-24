import { useTranslations } from 'next-intl';
import {
    ListItem,
    ListItemContent,
    ListItemDescription,
    ListItemMedia,
    ListItemTitle
} from "@/registry/ui/list-item"
import { SparklesIcon } from "lucide-react"

export default function ListItemVariantsDemo() {
    const t = useTranslations('components.listItems.listItemVariants');

    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    {t('defaultHeader')}
                </h3>
                <ListItem>
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>{t('defaultTitle')}</ListItemTitle>
                        <ListItemDescription>
                            {t('defaultDescription')}
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    {t('outlineHeader')}
                </h3>
                <ListItem variant="outline">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>{t('outlineTitle')}</ListItemTitle>
                        <ListItemDescription>
                            {t('outlineDescription')}
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    {t('elevatedHeader')}
                </h3>
                <ListItem variant="elevated">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>{t('elevatedTitle')}</ListItemTitle>
                        <ListItemDescription>
                            {t('elevatedDescription')}
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    {t('filledHeader')}
                </h3>
                <ListItem variant="filled">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>{t('filledTitle')}</ListItemTitle>
                        <ListItemDescription>
                            {t('filledDescription')}
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>
        </div>
    )
}