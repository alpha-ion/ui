import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/registry/ui/select"
import { useTranslations } from "next-intl"

export default function SelectDemo() {
    const t = useTranslations("components.selectDemo")

    return (
        <div className="flex items-center justify-center ">
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                    {t("label")}
                </label>
                <Select defaultValue="basic">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{t("group1.label")}</SelectLabel>
                            <SelectItem value="basic">{t("group1.basic")}</SelectItem>
                            <SelectItem value="contributor">{t("group1.contributor")}</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>{t("group2.label")}</SelectLabel>
                            <SelectItem value="pro">{t("group2.pro")}</SelectItem>
                            <SelectItem value="team">{t("group2.team")}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}