import { cn } from "@/lib/utils"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"
import Link from "next/link"
import * as React from "react"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row items-center gap-1 rounded-2xl bg-background/80 backdrop-blur-md border border-border/50 p-1 shadow-sm transition-all",
        className
      )}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  href?: string
  className?: string
  isActive?: boolean
  size?: "default" | "sm" | "lg" | "icon"
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "className">)
  | ({ href?: never } & React.ComponentProps<"button">)
)

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  const classes = cn(
    // Base styles - Apple inspired
    "relative inline-flex items-center justify-center",
    "font-medium text-sm tracking-tight",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
    
    // Size variants
    size === "icon" && "h-8 w-8 rounded-xl",
    size === "sm" && "h-7 px-3 rounded-xl",
    size === "default" && "h-8 px-3.5 rounded-xl",
    size === "lg" && "h-9 px-4 rounded-xl",
    
    // Active state - Apple blue accent
    isActive && [
      "bg-primary text-primary-foreground",
      "shadow-sm shadow-primary/20",
      "scale-100",
    ],
    
    // Inactive state - subtle hover
    !isActive && [
      "text-muted-foreground hover:text-foreground",
      "hover:bg-accent/50",
      "active:scale-95",
    ],
    
    className
  )

  const commonProps = {
    "aria-current": isActive ? ("page" as const) : undefined,
    "data-slot": "pagination-link" as const,
    "data-active": isActive,
    className: classes,
  }

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props
    return <Link href={href} {...commonProps} {...linkProps} />
  }

  const buttonProps = props as React.ComponentProps<"button">
  return <button type="button" {...commonProps} {...buttonProps} />
}

function PaginationPrevious({
  className,
  ...props
}: Omit<PaginationLinkProps, "size">) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "gap-1.5 pl-2.5 pr-3 font-medium",
        "hover:bg-accent/60 hover:shadow-sm",
        className
      )}
      {...(props as PaginationLinkProps)}
    >
      <ChevronLeftIcon className="h-4 w-4" strokeWidth={2.5} />
      <span className="hidden sm:inline-block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: Omit<PaginationLinkProps, "size">) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        "gap-1.5 pl-3 pr-2.5 font-medium",
        "hover:bg-accent/60 hover:shadow-sm",
        className
      )}
      {...(props as PaginationLinkProps)}
    >
      <span className="hidden sm:inline-block">Next</span>
      <ChevronRightIcon className="h-4 w-4" strokeWidth={2.5} />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex h-8 w-8 items-center justify-center",
        "text-muted-foreground/50",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="h-4 w-4" strokeWidth={2.5} />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
