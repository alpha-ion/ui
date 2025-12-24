import { Italic } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleGhostDemo() {
    return (
        <Toggle variant="ghost" aria-label="Toggle italic">
            <Italic />
        </Toggle>
    )
}
