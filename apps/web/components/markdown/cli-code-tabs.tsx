"use client"

import { Tabs } from "@/components/ui/custom-tabs"
import { useConfig } from "@/hooks/use-config"
import { useLocale } from "next-intl"
import * as React from "react"


export function CliCodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
    const [config, setConfig] = useConfig()
    const locale = useLocale()
    const installationType = React.useMemo(() => {
        return config?.installationType || "cli"
    }, [config])

    return (
        <Tabs 
            value={installationType}
            defaultValue="cli"
            dir={locale === "ar" ? "rtl" : "ltr"}
            onValueChange={(value) => {
                setConfig({ ...config, installationType: value as "cli" | "manual" })
            }}
            className="relative mt-4 w-full"
        >
            {children}
        </Tabs>
    )
}