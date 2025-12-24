import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"
import { useTranslations } from "next-intl"

export default function KbdButtonDemo() {
    const t = useTranslations("components.kdb.kbdButton")

    return (
        <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" size="sm" className="pr-2">
                {t("acceptLabel")} <Kbd>⏎</Kbd>
            </Button>
            <Button variant="outline" size="sm" className="pr-2">
                {t("cancelLabel")} <Kbd>Esc</Kbd>
            </Button>
        </div>
    )
}