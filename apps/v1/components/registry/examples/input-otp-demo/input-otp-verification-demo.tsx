"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/registry/ui/input-otp"
import * as React from "react"

export default function InputOTPVerificationDemo() {
    const [value, setValue] = React.useState("")
    const [isComplete, setIsComplete] = React.useState(false)

    React.useEffect(() => {
        setIsComplete(value.length === 6)
    }, [value])

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-4">
                <h3 className="font-medium text-lg">Enter verification code</h3>
                <p className="text-muted-foreground text-sm text-center max-w-sm">
                    We've sent a 6-digit code to your email. Please enter it below.
                </p>
            </div>
            
            <InputOTP 
                maxLength={6}
                value={value}
                onChange={setValue}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>

            {isComplete && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Code verified!</span>
                </div>
            )}
        </div>
    )
}

