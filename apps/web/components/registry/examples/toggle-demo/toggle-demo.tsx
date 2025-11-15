import { Toggle } from "@/registry/ui/toggle"
import { BookmarkIcon } from "lucide-react"

export default function ToggleDemo() {
    return (
        <Toggle
            aria-label="Toggle bookmark"
            size="sm"
            variant="outline"
            className="group"
        >
            <BookmarkIcon className="h-4 w-4 transition-colors group-data-[state=on]:fill-blue-500 group-data-[state=on]:stroke-blue-500" />
            Bookmark
        </Toggle>
    )
}
