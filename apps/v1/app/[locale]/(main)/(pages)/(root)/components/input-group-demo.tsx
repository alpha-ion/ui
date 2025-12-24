import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/ui/input-group"
import { Separator } from "@/registry/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/ui/tooltip"
import { IconCheck, IconInfoCircle, IconPlus } from "@tabler/icons-react"
import { ArrowUpIcon, Search } from "lucide-react"

export function InputGroupDemo() {
  return (
    <div className="grid w-full max-w-md  gap-6">
      <InputGroup className="rounded-lg">
        <InputGroupInput placeholder="Search products..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 products</InputGroupAddon>
      </InputGroup>
      <InputGroup className="rounded-lg">
        <InputGroupInput placeholder="store.com" className="!pl-1" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  className="rounded-full"
                  size="icon-xs"
                  aria-label="Info"
                >
                  <IconInfoCircle />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Enter your store domain name</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="rounded-lg">
        <InputGroupTextarea placeholder="Write your product review or feedback..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="outline"
            className="rounded-full"
            size="icon-xs"
            aria-label="Add"
          >
            <IconPlus />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Rating</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="[--radius:0.95rem]"
            >
              <DropdownMenuItem>5 Stars</DropdownMenuItem>
              <DropdownMenuItem>4 Stars</DropdownMenuItem>
              <DropdownMenuItem>3 Stars</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">150/500 chars</InputGroupText>
          <Separator orientation="vertical" className="!h-4" />
          <InputGroupButton
            variant="default"
            className="rounded-full"
            size="icon-xs"
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="@customer" />
        <InputGroupAddon align="inline-end">
          <div className="bg-primary text-foreground flex size-4 items-center justify-center rounded-full">
            <IconCheck className="size-3 text-white" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
