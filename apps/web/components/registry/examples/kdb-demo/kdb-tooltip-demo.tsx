import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"
import { Kbd, KbdGroup } from "@/registry/ui/kbd"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/registry/ui/tooltip"

export default function KbdTooltipDemo() {
    return (
        <div className="flex flex-wrap gap-4">
            <ButtonGroup>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="sm" variant="outline">
                                Save
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="flex items-center gap-2">
                                Save Changes <Kbd>S</Kbd>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="sm" variant="outline">
                                Print
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="flex items-center gap-2">
                                Print Document{" "}
                                <KbdGroup>
                                    <Kbd>Ctrl</Kbd>
                                    <Kbd>P</Kbd>
                                </KbdGroup>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </ButtonGroup>
        </div>
    )
}