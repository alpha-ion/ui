// 📄 DestructiveDialogDemo.tsx

"use client"

import { Button } from "@/registry/ui/button"
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
import { AlertTriangle, Trash2 } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

export default function DestructiveDialogDemo() {
  const t = useTranslations('components.dialog');
  const [isDeleting, setIsDeleting] = useState(false)
  const [itemDeleted, setItemDeleted] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setItemDeleted(true)
    }, 1500)
  }

  return (
    <div>
      {itemDeleted ? (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
          <p className="text-green-700 font-medium">
            {t('deleteSuccessMsg')}
          </p>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="me-1.5 rtl:ms-1.5 rtl:me-0" /> {t('deleteProjectBtn')}
            </Button>
          </DialogTrigger>
          <DialogContent appearance={"destructive"}>
            <DialogHeader>
              <DialogTitle className="text-destructive">
                {t('deleteTitle')}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {t('deleteDescription')}
              </DialogDescription>
            </DialogHeader>
            <div className="bg-red-50 dark:bg-red-950/50 p-4 rounded-lg mb-4">
              <div className="flex items-center">
                <AlertTriangle className="text-destructive me-3 flex-shrink-0 rtl:ms-3 rtl:me-0" />
                <p className="text-destructive text-sm">
                  {t('deleteWarningText')}
                </p>
              </div>
            </div>
            <DialogFooter>
              <DialogAction
                variant="destructive"
                disabled={isDeleting}
                onClick={handleDelete}
                className="w-full"
              >
                {isDeleting ? t('deleteLoadingBtn') : t('deleteActionBtn')}
              </DialogAction>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}