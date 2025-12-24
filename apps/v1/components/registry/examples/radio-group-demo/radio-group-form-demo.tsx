import { Button } from "@/registry/ui/button"
import { RadioGroup, RadioGroupItemWithLabel } from "@/registry/ui/radio-group"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function RadioGroupFormDemo() {
    const t = useTranslations("components.radioGroup.radioForm")
    const [value, setValue] = useState("card")

    return (
        <form className="space-y-4">
            <div>
                <h3 className="mb-4 text-lg font-medium rtl:text-right ltr:text-left">
                    {t("title")}
                </h3>
                <RadioGroup value={value} onValueChange={setValue}>
                    <RadioGroupItemWithLabel
                        value="card"
                        id="card"
                        label={t("methods.card")}
                    />
                    <RadioGroupItemWithLabel
                        value="paypal"
                        id="paypal"
                        label={t("methods.paypal")}
                    />
                    <RadioGroupItemWithLabel
                        value="apple"
                        id="apple"
                        label={t("methods.apple")}
                    />
                </RadioGroup>
            </div>
            <Button type="submit">{t("submit")}</Button>
        </form>
    )
}