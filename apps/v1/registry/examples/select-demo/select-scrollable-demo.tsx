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

export default function SelectScrollableDemo() {
    const t = useTranslations("components.selectScrollableDemo")

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
                {t("label")}
            </label>
            <Select defaultValue="eet"> 
                <SelectTrigger className="w-full max-w-[280px]">
                    <SelectValue placeholder={t("placeholder")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{t("groups.na.label")}</SelectLabel>
                        <SelectItem value="est">{t("groups.na.est")}</SelectItem>
                        <SelectItem value="cst">{t("groups.na.cst")}</SelectItem>
                        <SelectItem value="mst">{t("groups.na.mst")}</SelectItem>
                        <SelectItem value="pst">{t("groups.na.pst")}</SelectItem>
                        <SelectItem value="akst">{t("groups.na.akst")}</SelectItem>
                        <SelectItem value="hst">{t("groups.na.hst")}</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>{t("groups.eu_af.label")}</SelectLabel>
                        <SelectItem value="gmt">{t("groups.eu_af.gmt")}</SelectItem>
                        <SelectItem value="cet">{t("groups.eu_af.cet")}</SelectItem>
                        <SelectItem value="eet">{t("groups.eu_af.eet")}</SelectItem>
                        <SelectItem value="west">
                            {t("groups.eu_af.west")}
                        </SelectItem>
                        <SelectItem value="cat">{t("groups.eu_af.cat")}</SelectItem>
                        <SelectItem value="eat">{t("groups.eu_af.eat")}</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>{t("groups.asia.label")}</SelectLabel>
                        <SelectItem value="msk">{t("groups.asia.msk")}</SelectItem>
                        <SelectItem value="ist">{t("groups.asia.ist")}</SelectItem>
                        <SelectItem value="cst_china">{t("groups.asia.cst_china")}</SelectItem>
                        <SelectItem value="jst">{t("groups.asia.jst")}</SelectItem>
                        <SelectItem value="kst">{t("groups.asia.kst")}</SelectItem>
                        <SelectItem value="ist_indonesia">
                            {t("groups.asia.ist_indonesia")}
                        </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>{t("groups.au_pac.label")}</SelectLabel>
                        <SelectItem value="awst">
                            {t("groups.au_pac.awst")}
                        </SelectItem>
                        <SelectItem value="acst">
                            {t("groups.au_pac.acst")}
                        </SelectItem>
                        <SelectItem value="aest">
                            {t("groups.au_pac.aest")}
                        </SelectItem>
                        <SelectItem value="nzst">{t("groups.au_pac.nzst")}</SelectItem>
                        <SelectItem value="fjt">{t("groups.au_pac.fjt")}</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>{t("groups.sa.label")}</SelectLabel>
                        <SelectItem value="art">{t("groups.sa.art")}</SelectItem>
                        <SelectItem value="bot">{t("groups.sa.bot")}</SelectItem>
                        <SelectItem value="brt">{t("groups.sa.brt")}</SelectItem>
                        <SelectItem value="clt">{t("groups.sa.clt")}</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
                {t("scrollTip")}
            </p>
        </div>
    )
}