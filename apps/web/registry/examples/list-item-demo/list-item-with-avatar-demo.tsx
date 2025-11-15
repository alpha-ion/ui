import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import {
    ListItem,
    ListItemContent,
    ListItemDescription,
    ListItemGroup,
    ListItemMedia,
    ListItemSeparator,
    ListItemTitle,
} from "@/registry/ui/list-item"

export default function ListItemWithAvatarDemo() {
    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <ListItemGroup>
                <ListItem variant="outline" size="sm" asChild>
                    <a href="#">
                        <ListItemMedia variant="avatar">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle className="flex items-center gap-2">
                                Sarah Chen
                                <Badge variant="secondary" className="text-xs">
                                    Pro
                                </Badge>
                            </ListItemTitle>
                            <ListItemDescription>
                                Senior Product Designer · Active now
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
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle className="flex items-center gap-2">
                                Alex Rodriguez
                                <Badge variant="outline" className="text-xs">
                                    Free
                                </Badge>
                            </ListItemTitle>
                            <ListItemDescription>
                                Frontend Developer · 2 min ago
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
                                <AvatarFallback>NJ</AvatarFallback>
                            </Avatar>
                        </ListItemMedia>
                        <ListItemContent>
                            <ListItemTitle className="flex items-center gap-2">
                                Emma Wilson
                                <Badge variant="secondary" className="text-xs">
                                    Pro
                                </Badge>
                            </ListItemTitle>
                            <ListItemDescription>
                                UX Researcher · 1 hour ago
                            </ListItemDescription>
                        </ListItemContent>
                    </a>
                </ListItem>
            </ListItemGroup>
        </div>
    )
}

