"use client"

import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import {
  Archive,
  Camera,
  MoreHorizontal,
  Tags,
  Trash2,
  User
} from "lucide-react"
import { useTranslations } from "next-intl"

export default function DropdownNestedDemo() {
  const t = useTranslations('components.dropdown')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">{t('triggerActions')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Camera className="h-4 w-4 opacity-70" />
            <span className="flex-1 truncate">{t('viewPhoto')}</span>
            <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="h-4 w-4 opacity-70" />
            <span className="flex-1 truncate">{t('assignTo')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Tags className="h-4 w-4 opacity-70" />
              <span>{t('tags')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <span className="flex-1">{t('addTag')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="flex-1">{t('removeTag')}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-xs text-muted-foreground">{t('customTags')}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Archive className="h-4 w-4 opacity-70" />
            <span>{t('archive')}</span>
            <DropdownMenuShortcut>⇧E</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-destructive focus:text-destructive data-[state=open]:text-destructive data-[state=open]:bg-destructive/10 focus:bg-destructive/10">
              <Trash2 className="h-4 w-4" />
              <span>{t('deleteSubTrigger')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                {t('deleteConfirmLabel')}
              </DropdownMenuLabel>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                {t('deleteItem')}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 font-semibold">
                {t('deleteAll')}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}