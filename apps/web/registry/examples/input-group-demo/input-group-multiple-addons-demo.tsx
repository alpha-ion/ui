import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from "@/registry/ui/input-group"
import { CheckIcon, InfoIcon, SearchIcon, XIcon } from "lucide-react"

export default function InputGroupMultipleAddonsDemo() {
    return (
        <div className="grid w-full max-w-sm gap-6">
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder="Search amount" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <CheckIcon />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder="Enter repository name" className="!pl-0.5" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>github.com/</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Clear"
                    >
                        <XIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon>
                    <InfoIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder="example.com" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>.com</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Search"
                    >
                        <SearchIcon />
                    </InputGroupButton>
                </InputGroupAddon>
                <InputGroupAddon>
                    <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="username" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText className="text-muted-foreground text-xs">
                        12 results
                    </InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Info"
                    >
                        <InfoIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon>
                    <InputGroupText>Filter:</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="Search products..." />
                <InputGroupAddon align="inline-end">
                    <InputGroupText className="text-muted-foreground text-xs">
                        24 items
                    </InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Clear filters"
                    >
                        <XIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

