"use client"

import * as React from "react"
import { Button } from "@/registry/ui/button"
import {
    ButtonGroup,
    ButtonGroupSeparator,
} from "@/registry/ui/button-group"
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"

export function ButtonGroupSeparatorDemo() {
    const [align, setAlign] = React.useState<"left" | "center" | "right">("left")

    return (
        <ButtonGroup>
            <Button
                variant={align === "left" ? "secondary" : "ghost"}
                size="sm"
                aria-pressed={align === "left"}
                onClick={() => setAlign("left")}
                aria-label="Align left"
            >
                <AlignLeft className="mr-1 h-4 w-4" /> Left
            </Button>
            <ButtonGroupSeparator />
            <Button
                variant={align === "center" ? "secondary" : "ghost"}
                size="sm"
                aria-pressed={align === "center"}
                onClick={() => setAlign("center")}
                aria-label="Align center"
            >
                <AlignCenter className="mr-1 h-4 w-4" /> Center
            </Button>
            <ButtonGroupSeparator />
            <Button
                variant={align === "right" ? "secondary" : "ghost"}
                size="sm"
                aria-pressed={align === "right"}
                onClick={() => setAlign("right")}
                aria-label="Align right"
            >
                <AlignRight className="mr-1 h-4 w-4" /> Right
            </Button>
        </ButtonGroup>
    )
}

export default ButtonGroupSeparatorDemo