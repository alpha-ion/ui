import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/registry/ui/popover"
import { Separator } from "@/registry/ui/separator"
import { Checkbox } from "@/registry/ui/checkbox"
import { Input } from "@/registry/ui/input"
import { BotIcon, ChevronDownIcon, PlayIcon, UsersIcon } from "lucide-react"

export function ButtonGroupPopoverDemo() {
    return (
        <ButtonGroup>
            <Button variant="outline">
                <BotIcon /> AI Sprint Planner
            </Button>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Open sprint planner">
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 rounded-xl p-0 text-sm">
                    <div className="px-4 py-3">
                        <div className="text-sm font-medium">Sprint setup</div>
                        <p className="text-xs text-muted-foreground">Define a goal and pick quick tasks</p>
                    </div>
                    <Separator />
                    <div className="p-4 grid gap-3">
                        <div className="grid gap-2">
                            <label className="text-xs font-medium" htmlFor="sprint-goal">
                                Sprint goal
                            </label>
                            <Input id="sprint-goal" placeholder="e.g. Ship onboarding v2" />
                        </div>
                        <div className="grid gap-2">
                            <div className="text-xs font-medium">Quick tasks</div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Checkbox id="task-schemas" aria-label="Generate DB schemas" />
                                    <label htmlFor="task-schemas" className="cursor-pointer text-sm">
                                        Generate DB schemas
                                    </label>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Checkbox id="task-ci" aria-label="Setup CI" />
                                    <label htmlFor="task-ci" className="cursor-pointer text-sm">
                                        Setup CI
                                    </label>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Checkbox id="task-stories" aria-label="Draft user stories" />
                                    <label htmlFor="task-stories" className="cursor-pointer text-sm">
                                        Draft user stories
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-1">
                            <Button variant="ghost" size="sm">
                                <UsersIcon className="mr-1 h-4 w-4" /> Assign
                            </Button>
                            <Button size="sm">
                                <PlayIcon className="mr-1 h-4 w-4" /> Start
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </ButtonGroup>
    )
}

export default ButtonGroupPopoverDemo