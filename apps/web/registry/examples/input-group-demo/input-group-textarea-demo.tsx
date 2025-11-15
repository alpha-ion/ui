"use client"
import { Button } from "@/registry/ui/button"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/registry/ui/input-group"
import {
    IconCornerDownLeft,
    IconMoodSmile,
    IconPaperclip,
} from "@tabler/icons-react"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function InputGroupTextareaExample() {
    const [message, setMessage] = useState("")
    const [platform, setPlatform] = useState<"mac" | "windows">("windows")
    const [isSending, setIsSending] = useState(false)
    const MAX_CHARS = 500

    const handleSend = async () => {
        if (!message.trim() || isSending) return

        setIsSending(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log("Message sent:", message)
        setMessage("")
        setIsSending(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            handleSend()
        }
    }
    const componentMountedRef = useRef(true)
    useEffect(() => {
        const platformStr = navigator.platform.toLowerCase()
        const userAgentStr = navigator.userAgent.toLowerCase()
        if (platformStr.includes("mac") || userAgentStr.includes("mac")) {
            setPlatform("mac")
        }
        return () => {
            componentMountedRef.current = false
        }
    }, [])

    const remainingChars = MAX_CHARS - message.length
    const isOverLimit = remainingChars < 0
    const isNearLimit = remainingChars <= 50 && remainingChars > 0

    return (
        <div className="w-full max-w-2xl">
            <InputGroup className="rounded-xl">
                <InputGroupTextarea
                    id="textarea-message"
                    placeholder="Type your message here..."
                    className="min-h-[140px] resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSending}
                />
                <InputGroupAddon align="block-end" className="border-t bg-muted/30 pb-1.5">
                    <div className="flex items-center gap-1">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            disabled={isSending}
                            aria-label="Attach file"
                        >
                            <IconPaperclip className="h-4 w-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            disabled={isSending}
                            aria-label="Add emoji"
                        >
                            <IconMoodSmile className="h-4 w-4" />
                        </Button>
                    </div>
                    <InputGroupText
                        className={`text-xs transition-colors ${isOverLimit
                            ? "text-destructive font-medium"
                            : isNearLimit
                                ? "text-orange-500 font-medium"
                                : "text-muted-foreground"
                            }`}
                    >
                        {remainingChars}/{MAX_CHARS}
                    </InputGroupText>
                    <InputGroupButton
                        size="sm"
                        className="ml-auto gap-2"
                        variant="default"
                        onClick={handleSend}
                        disabled={!message.trim() || isOverLimit || isSending}
                    >
                        {isSending ? "Sending..." : "Send"}
                        <IconCornerDownLeft className="h-4 w-4" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <div className="mt-2 text-xs text-muted-foreground">
                Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted  font-mono text-[10px] font-medium opacity-100">
                    <span className="hidden lg:flex items-center gap-0.5">
                        <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded  px-1.5 font-mono text-[10px] font-medium hidden lg:flex">
                            {platform === "mac" ? "⌘" : "Ctrl"}
                        </kbd>
                        <ArrowRight className="w-2.5 h-2.5" />
                        <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium hidden lg:flex">
                            Enter
                        </kbd>
                    </span>
                </kbd> to send
            </div>
        </div>
    )
}