"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/ui/alert-dialog"
import { Button } from "@/registry/ui/button"
import { useTranslations } from "next-intl"

export default function AlertDialogDemo() {
  const t = useTranslations("components.alertDialog.alertDialogDemo")

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{t("triggerButton")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancelButton")}</AlertDialogCancel>
          <AlertDialogAction>{t("actionButton")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
