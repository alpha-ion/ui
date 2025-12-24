"use client"

import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function DropdownMenuRadioDemo() {
  const t = useTranslations('components.dropdown');

  const [selectedPlan, setSelectedPlan] = useState("basic")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {t('triggerSelectPlan')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {t('subscriptionPlanLabel')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedPlan}
          onValueChange={setSelectedPlan}
        >
          <DropdownMenuRadioItem value="basic">
            {t('planBasic')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pro">
            {t('planPro')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="enterprise">
            {t('planEnterprise')}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}