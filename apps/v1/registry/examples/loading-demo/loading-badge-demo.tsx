import { Badge } from "@/registry/ui/badge"
import { Loading } from "@/registry/ui/loading"
import { useTranslations } from "next-intl"

export default function LoadingBadgeDemo() {
    const t = useTranslations("components.loading.LoadingBadge")
    return (
        <div className="flex items-center gap-6">
            <Badge variant="default" icon={<Loading className="size-4" />}>
                {t("loading")}
            </Badge>
        </div>
    )
}
