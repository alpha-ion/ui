"use client"

import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Download, Edit, Share } from "lucide-react"
import { useTranslations } from "next-intl"

export default function DropdownMenuDemo() {
  const t = useTranslations('components.dropdown');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {t('triggerButton')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {t('accountLabel')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit className="me-2 h-4 w-4 rtl:ms-2 rtl:me-0" />
          <span>{t('editProfile')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="me-2 h-4 w-4 rtl:ms-2 rtl:me-0" />
          <span>{t('download')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Share className="me-2 h-4 w-4 rtl:ms-2 rtl:me-0" />
          <span>{t('shareDisabled')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}