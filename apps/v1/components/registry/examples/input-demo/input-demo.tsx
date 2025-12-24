"use client"
import { Input } from "@/registry/ui/input"
import { useTranslations } from "next-intl"

export default function InputDemo() {
  const t = useTranslations('components.input');
  return (
    <Input className="w-64" type="email" placeholder={t('emailPlaceholder')} />
  )
}