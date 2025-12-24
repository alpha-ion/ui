"use client"

import { LoadingIcon } from "@/components/icons/loading-icon"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { useLocale } from "next-intl"
import * as React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        neural:
          "bg-secondary/20 text-secondary hover:bg-secondary/30 backdrop-blur-sm",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      isLoading = false,
      icon,
      iconPosition = "left",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const locale = useLocale()
    const isRTL = locale === "ar"
    const Comp = asChild ? Slot : "button"

    const effectivePosition = isRTL
      ? (iconPosition === "left" ? "right" : "left")
      : iconPosition

    const content = (
      <>
        {(isLoading || icon) && effectivePosition === "left" && (
          <span className="inline-flex items-center">
            {isLoading ? <LoadingIcon size={14} /> : icon}
          </span>
        )}
        {children}
        {(isLoading || icon) && effectivePosition === "right" && (
          <span className="inline-flex items-center">
            {isLoading ? <LoadingIcon size={14} /> : icon}
          </span>
        )}
      </>
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        dir={isRTL ? "rtl" : "ltr"}
        aria-disabled={isLoading || props.disabled}
        {...props}
      >
        {asChild ? React.Children.only(children) : content}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }