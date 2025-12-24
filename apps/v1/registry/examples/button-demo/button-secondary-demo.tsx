"use client"

import { Button } from "@/registry/ui/button";
import { useTranslations } from "next-intl";

export default function ButtonSecondaryDemo() {
  const t = useTranslations('components.button');

  return (
    <Button variant="secondary">
      {t('secondary')}
    </Button>
  )
}