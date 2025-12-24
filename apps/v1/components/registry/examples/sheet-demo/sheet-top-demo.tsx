import { Button } from "@/registry/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet"
import { useTranslations } from "next-intl"

export default function SheetTopDemo() {
  const t = useTranslations("components.sheet.sheetTopDemo")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {t("triggerButton")}
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-64">
        <div className="max-w-md mx-auto">
          <SheetHeader>
            <SheetTitle>{t("sheetTitle")}</SheetTitle>
            <SheetDescription>{t("sheetDescription")}</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="space-y-3">
              <div className="p-3 bg-background/60 rounded-2xl border border-border">
                <p className="text-sm font-medium">{t("notification1Title")}</p>
                <p className="text-xs text-muted-foreground">{t("notification1Time")}</p>
              </div>
              <div className="p-3 bg-background/60 rounded-2xl border border-border">
                <p className="text-sm font-medium">{t("notification2Title")}</p>
                <p className="text-xs text-muted-foreground">{t("notification2Time")}</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}