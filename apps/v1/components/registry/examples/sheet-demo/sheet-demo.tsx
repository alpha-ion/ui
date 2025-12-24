import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Label } from "@/registry/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet"
import { Settings } from "lucide-react"
import { useTranslations } from "next-intl"

export default function SheetDemo() {
  const t = useTranslations("components.sheet.sheetDemo")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings size={16} />
          {t("triggerButton")}
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{t("sheetTitle")}</SheetTitle>
          <SheetDescription>
            {t("sheetDescription")}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="dark-mode"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("optionDarkMode")}
                </Label>
                <Checkbox id="dark-mode" />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("labelDarkMode")}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="notification"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("optionNotification")}
                </Label>
                <Checkbox id="notification" />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("labelNotification")}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="email-updates"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("optionEmailUpdates")}
                </Label>
                <Checkbox id="email-updates" />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("labelEmailUpdates")} 
              </p>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>{t("saveChangesButton")}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}