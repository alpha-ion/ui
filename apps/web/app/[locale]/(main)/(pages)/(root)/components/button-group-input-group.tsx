"use client"
import { Button } from "@/registry/ui/button"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/ui/input-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/ui/tooltip"
import { AudioLinesIcon, PlusIcon, SendIcon } from "lucide-react"
import * as React from "react"

export function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>("")

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value)
  }

  const handleVoiceToggle = (): void => {
    setVoiceEnabled(!voiceEnabled)
  }

  const handleSendMessage = (): void => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="flex gap-3 items-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Add attachment"
                className="rounded-lg h-10 w-10 flex-shrink-0 bg-transparent"
              >
                <PlusIcon className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add attachment</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex-1">
          <InputGroup className="rounded-lg h-10 border-input bg-input shadow-xs">
            <InputGroupInput
              placeholder={voiceEnabled ? "Recording voice message..." : "Type your message here..."}
              disabled={voiceEnabled}
              value={message}
              onChange={handleMessageChange}
              className="text-sm placeholder:text-muted-foreground"
            />
            <InputGroupAddon align="inline-end" className="pr-1">
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        onClick={handleVoiceToggle}
                        data-active={voiceEnabled}
                        className={`rounded-md transition-colors ${voiceEnabled
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                          }`}
                        aria-pressed={voiceEnabled}
                        size="icon-sm"
                        aria-label="Voice mode"
                      >
                        <AudioLinesIcon className="size-4" />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>Voice mode</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="rounded-md text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:opacity-50 transition-colors"
                        size="icon-sm"
                        aria-label="Send message"
                      >
                        <SendIcon className="size-4" />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>Send message</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      {voiceEnabled && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground px-1">
          <div className="size-2 bg-destructive rounded-full animate-pulse" />
          Recording voice message...
        </div>
      )}
    </div>
  )
}
