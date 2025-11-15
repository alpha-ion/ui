import { Button } from "@/registry/ui/button"
import {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemMedia,
    ListItemTitle,
} from "@/registry/ui/list-item"
import { BadgeCheckIcon, ChevronRightIcon, SparklesIcon } from "lucide-react"

export default function ListItemDemo() {
    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <ListItem variant="outline">
                <ListItemContent>
                    <ListItemTitle>AI Code Assistant</ListItemTitle>
                    <ListItemDescription>
                        Get intelligent code suggestions and auto-completion powered by advanced AI.
                    </ListItemDescription>
                </ListItemContent>
                <ListItemActions>
                    <Button size="sm" variant="default">
                        Activate
                    </Button>
                </ListItemActions>
            </ListItem>

            <ListItem variant="elevated" size="sm" asChild>
                <a href="#">
                    <ListItemMedia variant="icon">
                        <BadgeCheckIcon className="size-5 text-green-600" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>Development Environment Ready</ListItemTitle>
                        <ListItemDescription>
                            Your workspace is configured and ready for development.
                        </ListItemDescription>
                    </ListItemContent>
                    <ListItemActions>
                        <ChevronRightIcon className="size-4 text-muted-foreground" />
                    </ListItemActions>
                </a>
            </ListItem>

            <ListItem variant="filled" asChild>
                <a href="#">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>New Features Available</ListItemTitle>
                        <ListItemDescription>
                            Discover the latest updates and enhancements.
                        </ListItemDescription>
                    </ListItemContent>
                </a>
            </ListItem>
        </div>
    )
}

