import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"
import { useTranslations } from "next-intl"

export default function LabelDemo() {
  const t = useTranslations("components.label")
  return (
    <div className="flex items-center gap-2 rtl:flex-row-reverse">
      <Checkbox id="terms" />
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {t("termsText")}
      </Label>
    </div>
  )
}