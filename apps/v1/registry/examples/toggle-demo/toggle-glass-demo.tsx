import { Italic } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleGlassDemo() {
    return (
        <Toggle variant="glass" aria-label="Toggle italic">
            <Italic />
        </Toggle>
    )
}
