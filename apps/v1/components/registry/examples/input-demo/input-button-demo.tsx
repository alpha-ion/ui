"use client"

import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { useTranslations } from "next-intl"

export default function InputWithButtonDemo() {
  const t = useTranslations('components.input');
  return (
    <div className="flex items-center rtl:flex-row-reverse gap-2">
      <Input type="email" placeholder={t('emailPlaceholder')} />
      <Button type="submit" size={"sm"}>
        {t('subscribeButton')}
      </Button>
    </div>
  )
}