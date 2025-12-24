"use client"

import { Button } from "@/registry/ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl";

export default function ButtonLinkDemo() {
  const t = useTranslations('components.button');

  return (
    <Button variant="link" asChild>
      <Link href={"/href"}>
        {t('link')}
      </Link>
    </Button>
  )
}