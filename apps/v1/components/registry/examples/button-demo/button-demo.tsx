"use client"

import { Button } from "@/registry/ui/button"
import { useTranslations } from "next-intl";

export default function ButtonDemo() {
  const t = useTranslations('components.button');
  return (
    <Button variant={"default"}>{t('gettingStarted')}</Button>
  )
}