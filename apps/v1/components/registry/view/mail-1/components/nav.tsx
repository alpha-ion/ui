"use client"

import { buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    variant: "default" | "ghost"
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-3 data-[collapsed=true]:py-2 flex-1 overflow-y-auto"
    >
      <TooltipProvider>
        <nav className="grid gap-1 px-3 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9 transition-all duration-200 hover:shadow-sm",
                      link.variant === "default" &&
                      "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                    )}
                    aria-label={link.title}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4 animate-scale-in">
                  {link.title}
                  {link.label && <span className="ml-auto text-muted-foreground text-xs">{link.label}</span>}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant: link.variant, size: "sm" }),
                  "justify-start transition-all duration-200 text-sm font-medium hover:shadow-sm",
                  link.variant === "default" &&
                  "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                  link.variant === "ghost" && "hover:bg-sidebar-accent text-sidebar-foreground",
                )}
                aria-label={link.title}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto text-xs",
                      link.variant === "default" && "text-sidebar-primary-foreground/80",
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            ),
          )}
        </nav>
      </TooltipProvider>
    </div>
  )
}