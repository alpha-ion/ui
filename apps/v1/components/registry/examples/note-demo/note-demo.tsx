import { Note } from "@/registry/ui/note"
import { useTranslations } from "next-intl"

export default function NoteDemo() {
  const t = useTranslations("components.notes.demo")

  return (
    <Note variant="info">{t("info")}</Note>
  )
}
