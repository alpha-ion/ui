"use client"

import { Button } from "@/registry/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/ui/popover"
import { useTranslations } from "next-intl"

export default function PopoverDemo() {
  const t = useTranslations("components.popover")

  return (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">{t("trigger")}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h3 className="font-medium">{t("title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
