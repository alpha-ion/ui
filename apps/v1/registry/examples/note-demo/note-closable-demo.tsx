import { Note } from "@/registry/ui/note"
import { useTranslations } from "next-intl"

export default function NoteClosableDemo() {
  const t = useTranslations("components.notes.demo")

  return (
    <Note variant="info" closable>
      {t("closable")}
    </Note>
  )
}