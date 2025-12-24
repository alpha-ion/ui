import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/registry/ui/toggle-group"
import { BookmarkIcon, HeartIcon, StarIcon } from "lucide-react"

export default function ToggleGroupDemo() {
    return (
        <ToggleGroup type="multiple" variant="outline" size="sm">
            <ToggleGroupItem value="star" aria-label="Toggle star" className="group">
                <StarIcon className="h-4 w-4 transition-colors group-data-[state=on]:fill-yellow-500 group-data-[state=on]:stroke-yellow-500" />
                Star
            </ToggleGroupItem>
            <ToggleGroupItem value="heart" aria-label="Toggle heart" className="group">
                <HeartIcon className="h-4 w-4 transition-colors group-data-[state=on]:fill-red-500 group-data-[state=on]:stroke-red-500" />
                Heart
            </ToggleGroupItem>
            <ToggleGroupItem value="bookmark" aria-label="Toggle bookmark" className="group">
                <BookmarkIcon className="h-4 w-4 transition-colors group-data-[state=on]:fill-blue-500 group-data-[state=on]:stroke-blue-500" />
                Bookmark
            </ToggleGroupItem>
        </ToggleGroup>
    )
}
