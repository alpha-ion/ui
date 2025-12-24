"use client"

import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { useTranslations } from "next-intl";

export default function InputFileDemo() {
  const t = useTranslations('components.input');
  return (
    <div className="grid items-center gap-1.5">
      <Label htmlFor="picture">{t('pictureLabel')}</Label>
      <Input id="picture" type="file" />
    </div>
  )
}