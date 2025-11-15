import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/registry/ui/input-group"
import { Label } from "@/registry/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/registry/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { InfoIcon } from "lucide-react"

export default function InputGroupLabelDemo() {
    return (
        <div className="grid w-full max-w-sm gap-4">
            <InputGroup>
                <InputGroupInput id="email" placeholder="shadcn" />
                <InputGroupAddon>
                    <Label htmlFor="email">@</Label>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput id="email-2" placeholder="shadcn@vercel.com" />
                <InputGroupAddon align="block-start">
                    <Label htmlFor="email-2" className="text-foreground">
                        Email
                    </Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InputGroupButton
                                    variant="ghost"
                                    aria-label="Help"
                                    className="ml-auto rounded-full"
                                    size="icon-xs"
                                >
                                    <InfoIcon />
                                </InputGroupButton>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>We&apos;ll use this to send you notifications</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}
