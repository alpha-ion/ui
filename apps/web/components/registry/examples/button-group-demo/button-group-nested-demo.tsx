"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"

export function ButtonGroupNested() {
    return (
        <ButtonGroup>
            <ButtonGroup>
                <Button variant="outline" size="sm">
                    1
                </Button>
                <Button variant="outline" size="sm">
                    2
                </Button>
                <Button variant="outline" size="sm">
                    3
                </Button>
                <Button variant="outline" size="sm">
                    4
                </Button>
                <Button variant="outline" size="sm">
                    5
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="outline" size="sm" aria-label="Previous">
                    <ArrowLeftIcon />
                </Button>
                <Button variant="outline" size="sm" aria-label="Next">
                    <ArrowRightIcon />
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    )
}

export default ButtonGroupNested