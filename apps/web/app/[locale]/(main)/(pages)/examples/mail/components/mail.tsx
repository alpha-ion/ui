"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Moon,
  Search,
  Send,
  ShoppingCart,
  Sun,
  Trash2,
  Users2,
} from "lucide-react"
import * as React from "react"
import type { Mail } from "../data"
import { AccountSwitcher } from "./account-switcher"
import { MailList } from "./mail-list"
import { Nav } from "./nav"

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails: Mail[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function MailComponent({
  accounts,
  mails,
  defaultLayout = [20, 80],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const theme =
      localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    setIsDark(theme === "dark")
  }, [])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
          }}
          onResize={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
          }}
          className={cn(
            "bg-sidebar transition-all duration-300 ease-in-out flex flex-col",
            isCollapsed && "min-w-[50px]",
          )}
        >
          <div
            className={cn(
              "flex h-[60px] items-center justify-between border-b border-sidebar-border px-4",
              isCollapsed ? "justify-center px-2" : "",
            )}
          >
            <div className={cn("flex-1", isCollapsed && "hidden")}>
              <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
            </div>
            {isCollapsed && <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />}
          </div>
          <Separator className="bg-sidebar-border" />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inbox",
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Drafts",
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Sent",
                label: "",
                icon: Send,
                variant: "ghost",
              },
              {
                title: "Junk",
                label: "23",
                icon: ArchiveX,
                variant: "ghost",
              },
              {
                title: "Trash",
                label: "",
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator className="bg-sidebar-border" />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Updates",
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Forums",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Shopping",
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Promotions",
                label: "21",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <div className="mt-auto border-t border-sidebar-border p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span className={cn("text-sm", isCollapsed && "hidden")}>Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span className={cn("text-sm", isCollapsed && "hidden")}>Dark</span>
                </>
              )}
            </Button>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} className="flex flex-col">
          <Tabs defaultValue="all" className="flex h-full flex-col">
            <div className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
              <div className="bg-card/50 backdrop-blur-sm">
                <form>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="border-border bg-background pl-10 text-sm placeholder:text-muted-foreground focus:ring-1 transition-all"
                      aria-label="Search messages"
                    />
                  </div>
                </form>
              </div>
              <TabsList className="bg-muted w-full sm:w-auto">
                <TabsTrigger value="all" className="text-sm font-medium transition-colors">
                  All mail
                </TabsTrigger>
                <TabsTrigger value="unread" className="text-sm font-medium transition-colors">
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="m-0 flex-1 overflow-hidden">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0 flex-1 overflow-hidden">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
