import { Separator } from "@/registry/ui/separator"
import { useTranslations } from "next-intl"

export default function SeparatorRegularDemo() {
    const t = useTranslations("components.separatorDemos")
    return (
        <div className="p-4 rounded-lg ">
            <div className="p-4">{t("contentAbove")}</div>
            <Separator weight="light" />
            <div className="p-4">{t("contentBelow")}</div>
        </div>
    )
}