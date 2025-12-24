import { useTranslations } from 'next-intl';
import {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemGroup,
    ListItemMedia,
    ListItemSeparator,
    ListItemTitle,
} from "@/registry/ui/list-item"
import {
    BellIcon,
    ChevronRightIcon,
    LockIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react"

export default function ListItemGroupDemo() {
    const t = useTranslations('components.listItems.listItemGroup');

    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <ListItemGroup>
                <ListItem variant="outline" size="sm" asChild>
                    <a href="#">
                        <ListItemMedia variant="icon">
                            <UserIcon className="size-5" />
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle>{t('profileTitle')}</ListItemTitle>
                            <ListItemDescription>
                                {t('profileDescription')}
                            </ListItemDescription>
                        </ListItemContent>
                        <ListItemActions>
                            <ChevronRightIcon className="size-4 text-muted-foreground rtl:-rotate-180" />
                        </ListItemActions>
                    </a>
                </ListItem>
                <ListItemSeparator />
                <ListItem variant="outline" size="sm" asChild>
                    <a href="#">
                        <ListItemMedia variant="icon">
                            <BellIcon className="size-5" />
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle>{t('notificationsTitle')}</ListItemTitle>
                            <ListItemDescription>
                                {t('notificationsDescription')}
                            </ListItemDescription>
                        </ListItemContent>
                        <ListItemActions>
                            <ChevronRightIcon className="size-4 text-muted-foreground rtl:-rotate-180" />
                        </ListItemActions>
                    </a>
                </ListItem>
                <ListItemSeparator />
                <ListItem variant="outline" size="sm" asChild>
                    <a href="#">
                        <ListItemMedia variant="icon">
                            <LockIcon className="size-5" />
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle>{t('securityTitle')}</ListItemTitle>
                            <ListItemDescription>
                                {t('securityDescription')}
                            </ListItemDescription>
                        </ListItemContent>
                        <ListItemActions>
                            <ChevronRightIcon className="size-4 text-muted-foreground rtl:-rotate-180" />
                        </ListItemActions>
                    </a>
                </ListItem>
                <ListItemSeparator />
                <ListItem variant="outline" size="sm" asChild>
                    <a href="#">
                        <ListItemMedia variant="icon">
                            <SettingsIcon className="size-5" />
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle>{t('generalTitle')}</ListItemTitle>
                            <ListItemDescription>
                                {t('generalDescription')}
                            </ListItemDescription>
                        </ListItemContent>
                        <ListItemActions>
                            <ChevronRightIcon className="size-4 text-muted-foreground rtl:-rotate-180" />
                        </ListItemActions>
                    </a>
                </ListItem>
            </ListItemGroup>
        </div>
    )
}