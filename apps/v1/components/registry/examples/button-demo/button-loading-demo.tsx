"use client"

import { Button } from "@/registry/ui/button"
import { useTranslations } from "next-intl";

export default function ButtonLoadingDemo() {
  const t = useTranslations('components.button');

  return (
    <Button variant="default" isLoading>
      {t('loading')}
    </Button>
  )
}