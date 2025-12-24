import { Button } from "@/registry/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet"
import { Heart, Menu, Settings, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function SheetLeftDemo() {
  const t = useTranslations("components.sheet.sheetLeftDemo")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Menu size={16} />
          {t("triggerButton")}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{t("sheetTitle")}</SheetTitle>
        </SheetHeader>
        <nav className="py-6">
          <ul className="space-y-4">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded transition-colors"
              >
                <User size={18} />
                <span>{t("navItems.profile")}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded transition-colors"
              >
                <ShoppingCart size={18} />
                <span>{t("navItems.orders")}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded transition-colors"
              >
                <Heart size={18} />
                <span>{t("navItems.wishlist")}</span> 
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded transition-colors"
              >
                <Settings size={18} />
                <span>{t("navItems.settings")}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}