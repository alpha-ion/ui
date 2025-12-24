import { Separator } from "@/registry/ui/separator"
import { useTranslations } from "next-intl"

export default function SeparatorVerticalDemo() {
  const t = useTranslations("components.separatorDemos")
  return (
    <div className="p-4 rounded-lg flex items-center justify-center space-x-4 flex-row">
      <div className="p-4">{t("menuItem1")}</div>
      <Separator orientation="vertical" weight="regular" className="h-6 w-px" />
      <div className="p-4">{t("menuItem2")}</div>
      <Separator orientation="vertical" weight="regular" className="h-6 w-px" />
      <div className="p-4">{t("menuItem3")}</div>
    </div>
  )
}