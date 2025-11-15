"use client"

import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

export function ButtonGroupNested() {
  return (
    <ButtonGroup className="flex lg:w-full justify-between">
      <ButtonGroup>
        <Button variant="outline" >
          Dev
        </Button>
        <Button variant="outline" >
          Test
        </Button>
        <Button variant="outline">
          Production
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Previous">
          <ArrowLeftIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Next">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
