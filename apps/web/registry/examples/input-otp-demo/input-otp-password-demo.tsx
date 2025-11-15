"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/registry/ui/input-otp"
import * as React from "react"

export default function InputOTPPasswordDemo() {
    const [value, setValue] = React.useState("")

    return (
        <div className="flex flex-col items-center gap-6">
            <InputOTP 
                maxLength={6}
                value={value}
                onChange={setValue}
                containerClassName="gap-2"
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            {value && (
                <p className="text-muted-foreground text-sm">
                    Entered: {value}
                </p>
            )}
        </div>
    )
}

