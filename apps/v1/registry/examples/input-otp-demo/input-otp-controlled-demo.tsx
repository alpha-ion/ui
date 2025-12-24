"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/registry/ui/input-otp";
import { useLocale, useTranslations } from "next-intl";
import * as React from "react";

export default function InputOTPControlledDemo() {
    const t = useTranslations('components.inputOTP.otpControl');
    const [value, setValue] = React.useState("")
    const locale = useLocale() === "ar";
    return (
        <div className="space-y-2">
            <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
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
            <div className="text-center text-sm" dir={locale ? "rtl" : "ltr"}>
                {value === "" ? (
                    <>
                        {t('emptyMessage')}
                    </>
                ) : (
                    <>{t('enteredMessage', { value: value })}</>
                )}
            </div>
        </div>
    )
}