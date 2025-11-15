import {
    ListItem,
    ListItemContent,
    ListItemDescription,
    ListItemMedia,
    ListItemTitle
} from "@/registry/ui/list-item"
import { SparklesIcon } from "lucide-react"

export default function ListItemVariantsDemo() {
    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    Default Variant
                </h3>
                <ListItem>
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>Default Style</ListItemTitle>
                        <ListItemDescription>
                            Clean and minimal with subtle hover effects
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>

            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    Outline Variant
                </h3>
                <ListItem variant="outline">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>Outline Style</ListItemTitle>
                        <ListItemDescription>
                            Features a visible border with soft shadow
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>

            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    Elevated Variant
                </h3>
                <ListItem variant="elevated">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>Elevated Style</ListItemTitle>
                        <ListItemDescription>
                            Enhanced shadow for a floating effect
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>

            <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                    Filled Variant
                </h3>
                <ListItem variant="filled">
                    <ListItemMedia variant="icon">
                        <SparklesIcon className="size-5" />
                    </ListItemMedia>
                    <ListItemContent>
                        <ListItemTitle>Filled Style</ListItemTitle>
                        <ListItemDescription>
                            Subtle background color for emphasis
                        </ListItemDescription>
                    </ListItemContent>
                </ListItem>
            </div>
        </div>
    )
}

