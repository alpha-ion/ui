"use client"

import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { useTranslations } from "next-intl";

export default function InputWithLabel() {
  const t = useTranslations('components.input');
  return (
    <div className="grid w-64 items-center gap-1.5">
      <Label htmlFor="email">{t('emailLabel')}</Label>
      <Input type="email" id="email" placeholder={t('emailPlaceholder')} />
    </div>
  )
}