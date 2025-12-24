import { Note } from "@/registry/ui/note"
import { useTranslations } from "next-intl"

export default function NoteSuccessDemo() {
  const t = useTranslations("components.notes.demo")

  return (
    <Note variant="success">
      {t("success")}
    </Note>
  )
}