"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/registry/ui/input";
import { Globe, MoreVertical, Phone, Send, Video } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string
  user: string
  message: string
  time: string
  isCurrentUser: boolean
}

export default function ImprovedChatComponent() {
  const t = useTranslations("components.scrollAreaDemo.chat")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const isRTL = locale === "ar"

  // Get messages from translations
  const getInitialMessages = (): Message[] => {
    const messagesCount = 11 
    const messages: Message[] = []

    for (let i = 0; i < messagesCount; i++) {
      const user = t(`messages.${i}.user`)
      messages.push({
        id: (i + 1).toString(),
        user: user,
        message: t(`messages.${i}.message`),
        time: `10:${15 + i * 2} AM`,
        isCurrentUser: user === t("you"),
      })
    }

    return messages
  }

  const [messages, setMessages] = useState<Message[]>(getInitialMessages())
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 128)}px`
    }
  }, [inputValue])

  useEffect(() => {
    // Update messages when locale changes
    setMessages(getInitialMessages())
  }, [locale])

  const handleSend = () => {
    if (!inputValue.trim()) return
    const newMessage: Message = {
      id: Date.now().toString(),
      user: t("you"),
      message: inputValue,
      time: new Date().toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", {
        hour: '2-digit',
        minute: '2-digit'
      }),
      isCurrentUser: true,
    }
    setMessages(prev => [...prev, newMessage])
    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getUserInitials = (name: string) => name.substring(0, 2).toUpperCase()

  return (
    <div className="flex items-center justify-center min-h-[300px] w-full bg-background p-2">
      <div
        className={cn(
          "w-full max-w-3xl h-[500px] rounded-xl border border-border bg-card shadow-sm flex flex-col overflow-hidden",
          isRTL && "rtl"
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-muted/50 shrink-0 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold border border-border/50">
                UI
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-card"></span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">{t("title")}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {t("activeNow")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.isCurrentUser ? (isRTL ? "mr-auto flex-row-reverse" : "ml-auto flex-row-reverse") : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border",
                message.isCurrentUser
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground border-border"
              )}>
                {getUserInitials(message.user)}
              </div>
              <div className={cn(
                "flex flex-col",
                message.isCurrentUser ? (isRTL ? "items-start" : "items-end") : (isRTL ? "items-end" : "items-start")
              )}>
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {message.user}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">
                    {message.time}
                  </span>
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                    message.isCurrentUser
                      ? isRTL
                        ? "bg-primary text-primary-foreground rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                      : isRTL
                        ? "bg-muted/50 text-foreground border border-border/50 rounded-tr-sm"
                        : "bg-muted/50 text-foreground border border-border/50 rounded-tl-sm"
                  )}
                >
                  {message.message}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-background border-t border-border shrink-0">
          <div className="relative flex items-center gap-2 p-1.5 transition-all">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t("placeholder")}
              className="w-full bg-transparent placeholder:text-muted-foreground/70 h-[37px]"
            />
            <Button
              size={"sm"}
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={
                inputValue.trim()
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            {t("pressEnter")} <kbd className="font-sans px-1 rounded bg-muted border border-border">Enter</kbd> {t("toSend")}
          </p>
        </div>
      </div>
    </div>
  )
}