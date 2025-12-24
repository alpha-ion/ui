"use client"

import { Button } from "@/registry/ui/button"
import { useTranslations } from "next-intl";

export default function ButtonPulseDemo() {
  const t = useTranslations('components.button');

  return (
    <Button animation="pulse">
      {t('pulseAnimation')}
    </Button>
  )
}