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
    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <ListItemGroup>
                <ListItem variant="outline" size="sm" asChild>
                    <a href="#">
                        <ListItemMedia variant="icon">
                            <UserIcon className="size-5" />
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle>Profile Settings</ListItemTitle>
                            <ListItemDescription>
                                Manage your account and personal information
                            </ListItemDescription>
                        </ListItemContent>
                        <ListItemActions>
                            <ChevronRightIcon className="size-4 text-muted-foreground" />
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
                            <ListItemTitle>Notifications</ListItemTitle>
                            <ListItemDescription>
                                Configure your notification preferences
                            </ListItemDescription>
                        </ListItemContent>
                        <ListItemActions>
                            <ChevronRightIcon className="size-4 text-muted-foreground" />
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
                            <ListItemTitle>Security & Privacy</ListItemTitle>
                            <ListItemDescription>
                                Control your security settings and privacy options
                            </ListItemDescription>
                        </ListItemContent>
                        <ListItemActions>
                            <ChevronRightIcon className="size-4 text-muted-foreground" />
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
                            <ListItemTitle>General Settings</ListItemTitle>
                            <ListItemDescription>
                                App preferences and customization options
                            </ListItemDescription>
                        </ListItemContent>
                        <ListItemActions>
                            <ChevronRightIcon className="size-4 text-muted-foreground" />
                        </ListItemActions>
                    </a>
                </ListItem>
            </ListItemGroup>
        </div>
    )
}

