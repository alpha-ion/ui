"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/ui/input-group"
import { Label } from "@/registry/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/ui/popover"
import { IconInfoCircle, IconStar } from "@tabler/icons-react"
import * as React from "react"

export function InputGroupButtonExample() {
  const [isFavorite, setIsFavorite] = React.useState(false)

  return (
    <div className="grid w-full max-w-sm gap-6">
      <Label htmlFor="input-secure-19" className="sr-only">
        Repository URL
      </Label>
      <InputGroup className="[--radius:9999px]">
        <InputGroupInput id="input-secure-19" placeholder="my-awesome-project" className="!pl-0.5" />
        <Popover>
          <PopoverTrigger asChild>
            <InputGroupAddon>
              <InputGroupButton
                variant="secondary"
                size="icon-xs"
                aria-label="Info"
              >
                <IconInfoCircle />
              </InputGroupButton>
            </InputGroupAddon>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            alignOffset={10}
            className="flex flex-col gap-1 rounded-xl text-sm"
          >
            <p className="font-medium">Repository URL is valid.</p>
            <p>This repository is ready for AI-powered development.</p>
          </PopoverContent>
        </Popover>
        <InputGroupAddon className="text-muted-foreground !pl-1">
          github.com/
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={() => setIsFavorite(!isFavorite)}
            size="icon-xs"
            aria-label="Favorite"
          >
            <IconStar
              data-favorite={isFavorite}
              className="data-[favorite=true]:fill-yellow-500 data-[favorite=true]:stroke-yellow-500"
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
