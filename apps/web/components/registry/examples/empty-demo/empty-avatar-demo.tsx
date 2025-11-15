"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"
import { PlusIcon } from "lucide-react"
import { useState, type ReactNode } from "react"

interface TeamMember {
    id: string
    name: string
    image: string
    initials: string
}

interface EmptyAvatarGroupProps {
    onInvite?: () => void
    title?: string
    description?: string
    buttonText?: string
}

const defaultMembers: TeamMember[] = [
    {
        id: "1",
        name: "Alex Chen",
        image: "https://github.com/shadcn.png",
        initials: "AC",
    },
    {
        id: "2",
        name: "Sarah Kim",
        image: "https://github.com/maxleiter.png",
        initials: "SK",
    },
    {
        id: "3",
        name: "Mike Johnson",
        image: "https://github.com/evilrabbit.png",
        initials: "MJ",
    },
]

export default function EmptyAvatarGroupDemo({
    onInvite,
    title = "Development Team",
    description = "Connect with your development team to start building amazing projects together.",
    buttonText = "Add Team Member",
}: EmptyAvatarGroupProps): ReactNode {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleInviteClick = async (): Promise<void> => {
        setIsLoading(true)
        try {
            if (onInvite) {
                await onInvite()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Empty className="border bg-gradient-to-br from-background to-muted/30 shadow-sm">
            <EmptyHeader>
                <EmptyMedia>
                    <div className="flex -space-x-3 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:size-14 *:data-[slot=avatar]:transition-transform *:data-[slot=avatar]:hover:scale-110">
                        {defaultMembers.map((member: TeamMember) => (
                            <Avatar key={member.id} className="border-2 border-background">
                                <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} className="object-cover" />
                                <AvatarFallback className="bg-muted text-sm font-semibold">{member.initials}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </EmptyMedia>
                <EmptyTitle className="text-2xl font-semibold tracking-tight">{title}</EmptyTitle>
                <EmptyDescription className="text-base text-muted-foreground">{description}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button
                    onClick={handleInviteClick}
                    disabled={isLoading}
                    size="default"
                    className="gap-2 rounded-lg px-3 py-1.5 font-medium transition-all hover:shadow-md"
                >
                    <PlusIcon className="size-5" />
                    {isLoading ? "Adding..." : buttonText}
                </Button>
            </EmptyContent>
        </Empty>
    )
}
