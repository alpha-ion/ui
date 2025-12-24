import { useTranslations } from 'next-intl';
import {
    ListItem,
    ListItemContent,
    ListItemDescription,
    ListItemMedia,
    ListItemTitle
} from "@/registry/ui/list-item"
import { SparklesIcon } from "lucide-react"

export default function ListItemSizesDemo() {
    const t = useTranslations('components.listItems.listItemSizes');

    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    {t('smallSizeHeader')}
                </h3>
                <ListItem variant="outline" size="sm">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-4" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>{t('smallSizeTitle')}</ListItemTitle>
                        <ListItemDescription>
                            {t('smallSizeDescription')}
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    {t('defaultSizeHeader')}
                </h3>
                <ListItem variant="outline" size="default">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>{t('defaultSizeTitle')}</ListItemTitle>
                        <ListItemDescription>
                            {t('defaultSizeDescription')}
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    {t('largeSizeHeader')}
                </h3>
                <ListItem variant="outline" size="lg">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-6" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>{t('largeSizeTitle')}</ListItemTitle>
                        <ListItemDescription>
                            {t('largeSizeDescription')}
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>
        </div>
    )
}