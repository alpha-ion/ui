import { Note } from "@/registry/ui/note"
import { useTranslations } from "next-intl"

export default function NoteErrorDemo() {
  const t = useTranslations("components.notes.demo")

  return (
    <Note variant="error">
      {t("error")}
    </Note>
  )

}