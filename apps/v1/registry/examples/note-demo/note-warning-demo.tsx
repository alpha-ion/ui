import { Note } from "@/registry/ui/note"
import { useTranslations } from "next-intl"

export default function NoteWarningDemo() {
  const t = useTranslations("components.notes.demo")

  return (
    <Note variant="warning">
      {t("warning")}
    </Note>
  )
}