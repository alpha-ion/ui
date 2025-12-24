"use client"

import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { useTranslations } from "next-intl";

export default function DialogBottomDemo() {
  const t = useTranslations('components.dialog');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {t('bottomDialogTrigger')}
        </Button>
      </DialogTrigger>
      <DialogContent position="bottom">
        <DialogHeader>
          <DialogTitle>
            {t('bottomDialogTitle')}
          </DialogTitle>
          <DialogDescription>
            {t('bottomDialogDescription')}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}