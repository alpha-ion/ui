import { Button } from "@/registry/ui/button"
import { Loading } from "@/registry/ui/loading"
import { useTranslations } from "next-intl"

export default function LoadingButtonDemo() {
    const t = useTranslations("components.loading.LoadingBadge")
    return (
        <div className="flex items-center gap-6">
            <Button variant="default" icon={<Loading className="size-4" />}>
                {t("loading")}
            </Button>
        </div>
    )
}
