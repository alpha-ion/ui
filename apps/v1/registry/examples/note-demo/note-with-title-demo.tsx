import { Note } from "@/registry/ui/note"
import { useTranslations } from "next-intl"

export default function NoteWithTitleDemo() {
    const t = useTranslations("components.notes.demo")

    return (
        <Note variant="info" title={t("withTitle.title")}>
            {t("withTitle.content")}
        </Note>
    )
}