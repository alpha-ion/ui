import { Button } from "@/registry/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet"
import { Heart, ShoppingCart, User } from "lucide-react"
import { useTranslations } from "next-intl"

export default function SheetBottomDemo() {
  const t = useTranslations("components.sheet.sheetBottomDemo")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {t("triggerButton")}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-64">
        <div className="max-w-md mx-auto">
          <SheetHeader>
            <SheetTitle>{t("sheetTitle")}</SheetTitle>
            <SheetDescription>{t("sheetDescription")}</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
              >
                <User size={24} />
                <span>{t("actionProfile")}</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
              >
                <ShoppingCart size={24} />
                <span>{t("actionCart")}</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
              >
                <Heart size={24} />
                <span>{t("actionFavorites")}</span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}