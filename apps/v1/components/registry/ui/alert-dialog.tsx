"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { useLocale } from "next-intl"
import React, { createContext, ReactNode, useContext } from "react"

type LocaleType = "ar" | "en" | string

const AlertDialogLocaleContext = createContext<LocaleType>("en")
const useAlertDialogLocale = () => useContext(AlertDialogLocaleContext)

const AlertDialog = React.forwardRef<ReactNode, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>>(({ children, ...props }, ref) => {
  const locale = useLocale()

  return (
    <AlertDialogLocaleContext.Provider value={locale}>
      <AlertDialogPrimitive.Root {...props}>
        {children}
      </AlertDialogPrimitive.Root>
    </AlertDialogLocaleContext.Provider>
  )
})
AlertDialog.displayName = "AlertDialog"

const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Trigger ref={ref} className={cn(className)} {...props}>
    {children}
  </AlertDialogPrimitive.Trigger>
))
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 transition",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const alertDialogContentVariants = cva(
  "fixed z-50 lg:w-full w-[92%] max-w-md rounded-2xl border-none shadow-2xl",
  {
    variants: {
      appearance: {
        default: "bg-white/95 dark:bg-neutral-900",
        destructive: "bg-red-50/95 dark:bg-red-950/90",
      },
    },
    defaultVariants: {
      appearance: "default",
    },
  }
)

export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>,
  VariantProps<typeof alertDialogContentVariants> {
  closeOnClickOutside?: boolean
}

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, appearance, closeOnClickOutside = true, ...props }, ref) => {
  const locale = useAlertDialogLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay
        onClick={closeOnClickOutside ? undefined : (e) => e.stopPropagation()}
      />
      <AlertDialogPrimitive.Content
        ref={ref}
        dir={dir}
        className={cn(
          alertDialogContentVariants({ appearance }),
          "fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[50%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[50%] grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
})
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col gap-2 text-start",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col sm:flex-row gap-2 sm:justify-end",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold tracking-tight text-start",
      className
    )}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground leading-relaxed text-start",
      className
    )}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    variant?: VariantProps<typeof buttonVariants>["variant"]
    size?: VariantProps<typeof buttonVariants>["size"]
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      buttonVariants({ variant, size }),
      "rounded-full text-base font-semibold px-4 py-2",
      "transition-colors duration-200 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
      className
    )}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & {
    variant?: VariantProps<typeof buttonVariants>["variant"]
    size?: VariantProps<typeof buttonVariants>["size"]
  }
>(({ className, variant = "ghost", size = "default", ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant, size }),
      "rounded-full text-base font-semibold px-4 py-2",
      "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
      "transition-colors duration-200 ease-in-out",
      "border-border border",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  alertDialogContentVariants,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
}