import {
    ListItem,
    ListItemContent,
    ListItemDescription,
    ListItemMedia,
    ListItemTitle
} from "@/registry/ui/list-item"
import { SparklesIcon } from "lucide-react"

export default function ListItemSizesDemo() {
    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    Small Size
                </h3>
                <ListItem variant="outline" size="sm">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-4" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>Compact Item</ListItemTitle>
                        <ListItemDescription>
                            Perfect for dense lists and navigation menus
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>

            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    Default Size
                </h3>
                <ListItem variant="outline" size="default">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>Standard Item</ListItemTitle>
                        <ListItemDescription>
                            Balanced spacing for most use cases and comfortable reading
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>

            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    Large Size
                </h3>
                <ListItem variant="outline" size="lg">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-6" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>Spacious Item</ListItemTitle>
                        <ListItemDescription>
                            Extra padding for emphasis and improved touch targets on mobile devices
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>
        </div>
    )
}

