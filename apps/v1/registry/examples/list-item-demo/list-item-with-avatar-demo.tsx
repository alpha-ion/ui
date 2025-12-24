import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";
import { Badge } from "@/registry/ui/badge";
import {
    ListItem,
    ListItemContent,
    ListItemDescription,
    ListItemGroup,
    ListItemMedia,
    ListItemSeparator,
    ListItemTitle,
} from "@/registry/ui/list-item";
import { useTranslations } from 'next-intl';

export default function ListItemWithAvatarDemo() {
    const t = useTranslations('components.listItems.listItemAvatar');

    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <ListItemGroup>
                <ListItem variant="outline" size="sm" asChild>
                    <a href="#">
                        <ListItemMedia variant="avatar">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle className="flex items-center gap-2">
                                {t('user1Name')}
                                <Badge variant="secondary" className="text-xs">
                                    {t('badgePro')}
                                </Badge>
                            </ListItemTitle>
                            <ListItemDescription>
                                {t('user1Details')}
                            </ListItemDescription>
                        </ListItemContent>
                    </a>
                </ListItem>
                <ListItemSeparator />
                <ListItem variant="outline" size="sm" asChild>
                    <a href="#">
                        <ListItemMedia variant="avatar">
                            <Avatar>
                                <AvatarImage src="https://github.com/vercel.png" />
                                <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle className="flex items-center gap-2">
                                {t('user2Name')}
                                <Badge variant="outline" className="text-xs">
                                    {t('badgeFree')}
                                </Badge>
                            </ListItemTitle>
                            <ListItemDescription>
                                {t('user2Details')}
                            </ListItemDescription>
                        </ListItemContent>
                    </a>
                </ListItem>
                <ListItemSeparator />
                <ListItem variant="outline" size="sm" asChild>
                    <a href="#">
                        <ListItemMedia variant="avatar">
                            <Avatar>
                                <AvatarImage src="https://github.com/nextjs.png" />
                                <AvatarFallback>EW</AvatarFallback>
                            </Avatar>
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle className="flex items-center gap-2">
                                {t('user3Name')}
                                <Badge variant="secondary" className="text-xs">
                                    {t('badgePro')}
                                </Badge>
                            </ListItemTitle>
                            <ListItemDescription>
                                {t('user3Details')}
                            </ListItemDescription>
                        </ListItemContent>
                    </a>
                </ListItem>
            </ListItemGroup>
        </div>
    )
}