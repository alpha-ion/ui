"use client"

import { Button } from "@/registry/ui/button"
import { useTranslations } from "next-intl";

export default function ButtonOutlineDemo() {
  const t = useTranslations('components.button');

  return (
    <Button variant="outline">
      {t('outline')}
    </Button>
  )
}