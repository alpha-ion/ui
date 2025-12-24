import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/ui/popover"
import { Separator } from "@/registry/ui/separator"
import { Textarea } from "@/registry/ui/textarea"
import { BotIcon, ChevronDownIcon } from "lucide-react"

export function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <BotIcon /> AI Assistant
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open Popover">
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="rounded-xl p-0 text-sm">
          <div className="px-4 py-3">
            <div className="text-sm font-medium">AI Development Tasks</div>
          </div>
          <Separator />
          <div className="p-4 text-sm *:[p:not(:last-child)]:mb-2">
            <Textarea
              placeholder="Describe your coding task or feature request..."
              className="mb-4 resize-none"
            />
            <p className="font-medium">Start a new development task</p>
            <p className="text-muted-foreground">
              Describe your coding task in natural language. AI Assistant will work in the
              background and generate code for your review.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
