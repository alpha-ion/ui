import { Italic } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

export default function ToggleLgDemo() {
    return (
        <Toggle size="lg" aria-label="Toggle italic">
            <Italic />
        </Toggle>
    )
}
