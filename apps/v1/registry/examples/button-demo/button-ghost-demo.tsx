"use client"

import { Button } from "@/registry/ui/button"
import { useTranslations } from "next-intl";

export default function ButtonGhostDemo() {
  const t = useTranslations('components.button');

  return (
    <Button variant="ghost">{t('ghost')}</Button>
  )
}