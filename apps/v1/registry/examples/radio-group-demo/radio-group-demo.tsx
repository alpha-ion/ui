"use client"

import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { Label } from "@/registry/ui/label"
import { useTranslations } from "next-intl"

export default function RadioGroupDemo() {
    const t = useTranslations("components.radioGroup.radioDemo")

    return (
        <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one" className="rtl:text-right ltr:text-left">
                    {t("optionOne")}
                </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two" className="rtl:text-right ltr:text-left">
                    {t("optionTwo")}
                </Label>
            </div>
        </RadioGroup>
    )
}
