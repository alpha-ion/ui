"use client"

import { Button } from "@/registry/ui/button"
import { useTranslations } from "next-intl";

export default function ButtonDestructiveDemo() {
  const t = useTranslations('components.button');

  return (
    <Button variant="destructive">{t('destructive')}</Button>
  )
}