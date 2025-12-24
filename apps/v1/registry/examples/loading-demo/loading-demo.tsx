import { convertToArabicDigits } from "@/registry/ui/input-otp"
import {
    ListItem,
    ListItemContent,
    ListItemMedia,
    ListItemTitle,
} from "@/registry/ui/list-item"
import { Loading } from "@/registry/ui/loading"
import { useTranslations } from "next-intl"

export default function LoadingDemo() {
    const t = useTranslations("components.loading.loadingDemo")
    return (

        <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
            <ListItem variant="outline">
                <ListItemMedia>
                    <Loading />
                </ListItemMedia>
                <ListItemContent>
                    <ListItemTitle className="line-clamp-1">{t("title")}</ListItemTitle>
                </ListItemContent>
                <ListItemContent className="flex-none justify-end">
                    <span className="text-sm tabular-nums">{t("currencySuffix")} {convertToArabicDigits("100")}</span>
                </ListItemContent>
            </ListItem>
        </div>
    )
}
