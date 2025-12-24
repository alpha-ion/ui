"use client"

import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import {
    AlertTriangleIcon,
    CheckIcon,
    ChevronDownIcon,
    CopyIcon,
    ShareIcon,
    TrashIcon,
    UserRoundXIcon,
    VolumeOffIcon,
} from "lucide-react"

export function ButtonGroupDropdownMenuDemo() {
    return (
        <ButtonGroup>
            <Button variant="outline">Follow</Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="!pl-2">
                        <ChevronDownIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="[--radius:1rem]">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <VolumeOffIcon />
                            Mute Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CheckIcon />
                            Mark as Read
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <AlertTriangleIcon />
                            Report Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <UserRoundXIcon />
                            Block User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ShareIcon />
                            Share Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CopyIcon />
                            Copy Conversation
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <TrashIcon />
                            Delete Conversation
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </ButtonGroup>
    )
}

export default ButtonGroupDropdownMenuDemo