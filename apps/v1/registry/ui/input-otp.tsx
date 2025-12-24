"use client"

import { cn } from "@/lib/utils"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"

type LocaleType = "ar" | "en" | string

type InputOTPContextValue = {
  locale: LocaleType
  arabicDigits: boolean
}

const InputOTPLocaleContext = React.createContext<InputOTPContextValue>({
  locale: "en",
  arabicDigits: false,
})

const useInputOTPLocale = () => React.useContext(InputOTPLocaleContext)

const convertToArabicDigits = (str: string): string => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return str.replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit)])
}

const convertToEnglishDigits = (str: string): string => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return str.replace(/[٠-٩]/g, (digit) => arabicDigits.indexOf(digit).toString())
}

type InputOTPProps = React.ComponentProps<typeof OTPInput> & {
  arabicDigits?: boolean
}

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ className, containerClassName, arabicDigits = false, onChange, ...props }, ref) => {
  const locale = useLocale()
  const isRTL = locale === "ar"

  const handleChange = (value: string) => {
    const normalizedValue = convertToEnglishDigits(value)
    onChange?.(normalizedValue)
  }

  return (
    <InputOTPLocaleContext.Provider value={{ locale, arabicDigits }}>
      <OTPInput
        ref={ref}
        containerClassName={cn(
          "flex items-center justify-center gap-3 has-[:disabled]:opacity-50",
          isRTL && "flex-row-reverse",
          containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        dir={isRTL ? "rtl" : "ltr"}
        onChange={handleChange}
        {...props}
      />
    </InputOTPLocaleContext.Provider>
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const { locale } = useInputOTPLocale()
  const isRTL = locale === "ar"

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2",
        isRTL && "flex-row-reverse",
        className
      )}
      {...props}
    />
  )
})
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { locale, arabicDigits } = useInputOTPLocale()
  const isRTL = locale === "ar"
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  const displayChar = char && arabicDigits ? convertToArabicDigits(char) : char

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-xl border border-input/60 bg-background text-lg font-medium transition-all duration-200",
        "shadow-sm hover:border-input/80 hover:shadow",
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
        isActive && "z-10 border-ring ring-2 ring-ring/20 shadow-md",
        className
      )}
      dir={isRTL ? "rtl" : "ltr"}
      {...props}
    >
      {displayChar}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-0.5 animate-caret-blink bg-ring duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const { locale } = useInputOTPLocale()
  const isRTL = locale === "ar"

  return (
    <div
      ref={ref}
      role="separator"
      className={cn(
        "flex items-center text-muted-foreground",
        isRTL && "rotate-180",
        className
      )}
      {...props}
    >
      <Minus className="h-4 w-4" />
    </div>
  )
})
InputOTPSeparator.displayName = "InputOTPSeparator"

export {
  convertToArabicDigits,
  convertToEnglishDigits, InputOTP,
  InputOTPGroup,
  InputOTPLocaleContext,
  InputOTPSeparator,
  InputOTPSlot,
  useInputOTPLocale
}

export type { InputOTPProps }