import { Separator } from "@/registry/ui/separator"
import { useTranslations } from "next-intl"

export default function SeparatorUltralightDemo() {
  const t = useTranslations("components.separatorDemos")
  return (
    <div className="p-4 rounded-lg ">
      <div className="p-4">{t("contentAbove")}</div>
      <Separator weight="ultralight" />
      <div className="p-4">{t("contentBelow")}</div>
    </div>
  )
}
