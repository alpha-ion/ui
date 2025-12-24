"use client"

import { Button } from "@/registry/ui/button"
import { useTranslations } from "next-intl";

export default function ButtonPrimaryDemo() {
  const t = useTranslations('components.button');

  return (
    <Button variant="default">
      {t('primary')}
    </Button>
  )
}