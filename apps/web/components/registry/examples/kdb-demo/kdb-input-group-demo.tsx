import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/registry/ui/input-group"
import { Kbd } from "@/registry/ui/kbd"
import { SearchIcon } from "lucide-react"

export default function KbdInputGroupDemo() {
    return (
        <div className="flex w-full max-w-xs flex-col gap-6">
            <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}
