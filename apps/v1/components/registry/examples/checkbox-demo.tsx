"use client"

import { Checkbox } from "@/registry/ui/checkbox";
import { Label } from "@/registry/ui/label";
import { useLocale, useTranslations } from "next-intl";

export default function CheckboxDemo() {
    const t = useTranslations('components.checkbox');
    const locale = useLocale()
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3" dir={locale === "ar" ? "rtl" : "ltr"}>
                <Checkbox id="terms" />
                <Label htmlFor="terms">{t('termsLabel')}</Label>
            </div>
            <div className="flex items-start gap-3" dir={locale === "ar" ? "rtl" : "ltr"}>
                <Checkbox id="terms-2" defaultChecked />
                <div className="grid gap-2">
                    <Label htmlFor="terms-2">{t('termsLabel')}</Label>
                    <p className="text-muted-foreground text-sm text-right">
                        {t('termsDescription')}
                    </p>
                </div>
            </div>
            <div className="flex items-start gap-3" dir={locale === "ar" ? "rtl" : "ltr"}>
                <Checkbox id="toggle" disabled />
                <Label htmlFor="toggle">{t('notificationsLabel')}</Label>
            </div>
            <Label dir={locale === "ar" ? "rtl" : "ltr"} className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                    id="toggle-2"
                    defaultChecked
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                        {t('notificationsLabel')}
                    </p>
                    <p className="text-muted-foreground text-sm">
                        {t('notificationsDescription')}
                    </p>
                </div>
            </Label>
        </div>
    )
}