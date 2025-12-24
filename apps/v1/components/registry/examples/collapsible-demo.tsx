"use client"

import { Button } from "@/registry/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { useTranslations } from "next-intl"

export default function CollapsibleDemo() {
  const t = useTranslations('components.collapsible')
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between gap-4 px-4 rtl:flex-row-reverse">
        <h4 className="text-sm font-semibold">
          {t('securityTitle')}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">{t('viewOptionsAria')}</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        {t('option1')}
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          {t('option2')}
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          {t('option3')}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}