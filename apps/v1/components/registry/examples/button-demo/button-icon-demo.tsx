
"use client"

import { Button } from "@/registry/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ButtonIconDemo() {
  const t = useTranslations('components.button');

  return (
    <Button variant="default" icon={<ChevronRightIcon size={16} />}>
      {t('next')}
    </Button>
  )
}