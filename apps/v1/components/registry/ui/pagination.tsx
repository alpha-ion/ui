import { cn, formatNumber } from "@/lib/utils"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import * as React from "react"
import { createContext, useContext } from "react"

type LocaleType = "ar" | "en" | string

const PaginationLocaleContext = createContext<LocaleType>("en")
const usePaginationLocale = () => useContext(PaginationLocaleContext)

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <PaginationLocaleContext.Provider value={locale}>
      <nav
        role="navigation"
        aria-label="pagination"
        dir={dir}
        data-slot="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    </PaginationLocaleContext.Provider>
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
  children?: React.ReactNode
} & (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "className">)
    | ({ href?: never } & React.ComponentProps<"button">)
  )

function PaginationLink({
  className,
  isActive,
  size = "icon",
  children,
  ...props
}: PaginationLinkProps) {
  const locale = usePaginationLocale()

  const classes = cn(
    "relative inline-flex items-center justify-center rtl:flex-row-reverse",
    "font-medium text-sm tracking-tight",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
    size === "icon" && "h-8 w-8 rounded-xl",
    size === "sm" && "h-7 px-3 rounded-xl",
    size === "default" && "h-8 px-3.5 rounded-xl",
    size === "lg" && "h-9 px-4 rounded-xl",
    isActive && [
      "bg-primary text-primary-foreground",
      "shadow-sm shadow-primary/20",
      "scale-100",
    ],
    !isActive && [
      "text-muted-foreground hover:text-foreground",
      "hover:bg-accent/50",
      "active:scale-95",
    ],
    className
  )

  const formattedChildren = React.useMemo(() => {
    const num = Number(children)

    if (!isNaN(num)) {
      return formatNumber(num, locale)
    }

    return children
  }, [children, locale])


  const commonProps = {
    "aria-current": isActive ? ("page" as const) : undefined,
    "data-slot": "pagination-link" as const,
    "data-active": isActive,
    className: classes,
  }

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props
    return (
      <Link href={href} {...commonProps} {...linkProps}>
        {formattedChildren}
      </Link>
    )
  }

  const buttonProps = props as React.ComponentProps<"button">
  return (
    <button type="button" {...commonProps} {...buttonProps}>
      {formattedChildren}
    </button>
  )
}

function PaginationPrevious({
  className,
  ...props
}: Omit<PaginationLinkProps, "size">) {
  const locale = usePaginationLocale()
  const t = useTranslations("pagination")

  return (
    <PaginationLink
      aria-label={t("previousLabel")}
      size="default"
      className={cn(
        "gap-1.5 font-medium",
        "hover:bg-accent/60 hover:shadow-sm",
        "ltr:pl-2.5 ltr:pr-3 rtl:pr-2.5 rtl:pl-3",
        className
      )}
      {...(props as PaginationLinkProps)}
    >
      {locale === "ar" ? (
        <>
          <span className="hidden sm:inline-block">{t("previous")}</span>
          <ChevronRightIcon className="h-4 w-4" strokeWidth={2.5} />
        </>
      ) : (
        <>
          <ChevronLeftIcon className="h-4 w-4" strokeWidth={2.5} />
          <span className="hidden sm:inline-block">{t("previous")}</span>
        </>
      )}
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: Omit<PaginationLinkProps, "size">) {
  const locale = usePaginationLocale()
  const t = useTranslations("pagination")

  return (
    <PaginationLink
      aria-label={t("nextLabel")}
      size="default"
      className={cn(
        "gap-1.5 font-medium",
        "hover:bg-accent/60 hover:shadow-sm",
        "ltr:pl-3 ltr:pr-2.5 rtl:pr-3 rtl:pl-2.5",
        className
      )}
      {...(props as PaginationLinkProps)}
    >
      {locale === "ar" ? (
        <>
          <ChevronLeftIcon className="h-4 w-4" strokeWidth={2.5} />
          <span className="hidden sm:inline-block">{t("next")}</span>
        </>
      ) : (
        <>
          <span className="hidden sm:inline-block">{t("next")}</span>
          <ChevronRightIcon className="h-4 w-4" strokeWidth={2.5} />
        </>
      )}
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const t = useTranslations("pagination")

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
      <span className="sr-only">{t("morePages")}</span>
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
  PaginationPrevious,
}