import { Italic } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleWithTextDemo() {
    return (
        <Toggle aria-label="Toggle italic">
            <Italic />
            Italic
        </Toggle>
    )
}
