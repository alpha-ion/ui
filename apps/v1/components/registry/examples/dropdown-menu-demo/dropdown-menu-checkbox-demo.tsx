"use client"

import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function DropdownMenuCheckBoxDemo() {
  const t = useTranslations('components.dropdown');

  const [showIcons, setShowIcons] = useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {t('triggerViewOptions')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {t('preferencesLabel')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showIcons}
          onCheckedChange={setShowIcons}
        >
          {t('showIconsItem')}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}