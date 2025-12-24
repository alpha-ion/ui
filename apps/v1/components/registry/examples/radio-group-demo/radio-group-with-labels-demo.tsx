import { RadioGroup, RadioGroupItemWithLabel } from "@/registry/ui/radio-group"
import { useTranslations } from "next-intl"

export default function RadioGroupWithLabelsDemo() {
    const t = useTranslations("components.radioGroup.radioDemoLabels")

    return (
        <RadioGroup defaultValue="comfortable">
            <RadioGroupItemWithLabel
                value="default"
                id="r1"
                label={t("options.default.label")}
                description={t("options.default.description")}
            />
            <RadioGroupItemWithLabel
                value="comfortable"
                id="r2"
                label={t("options.comfortable.label")}
                description={t("options.comfortable.description")}
            />
            <RadioGroupItemWithLabel
                value="compact"
                id="r3"
                label={t("options.compact.label")}
                description={t("options.compact.description")}
            />
        </RadioGroup>
    )
}