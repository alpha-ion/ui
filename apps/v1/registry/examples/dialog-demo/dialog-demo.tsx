"use client"

import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import {
  Dialog,
  DialogAction,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog"
import { Label } from "@/registry/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { useState } from "react"
import { useTranslations } from "next-intl"

export default function DialogDemo() {
  const t = useTranslations('components.dialog');
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {t('triggerButton')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('title')}
          </DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('emailNotifTitle')}
            </label>
            <div className="flex items-center">
              <Checkbox />
              <span className="ltr:ml-2 rtl:mr-1 text-sm text-muted-foreground">
                {t('emailNotifDesc')}
              </span>
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-foreground mb-2">
              {t('profileVisibilityTitle')}
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('visibilityPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  {t('visibilityPublic')}
                </SelectItem>
                <SelectItem value="private">
                  {t('visibilityPrivate')}
                </SelectItem>
                <SelectItem value="friends-only">
                  {t('visibilityFriends')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogAction onClick={() => setIsOpen(false)}>
            {t('saveChangesButton')}
          </DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}