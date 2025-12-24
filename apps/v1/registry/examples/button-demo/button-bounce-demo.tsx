"use client"

import { Button } from "@/registry/ui/button"
import { useTranslations } from "next-intl";

export default function ButtonBounceDemo() {
  const t = useTranslations('components.button');

  return (
    <Button animation={"bounce"}>
      {t('bounceAnimation')}
    </Button>
  )
}