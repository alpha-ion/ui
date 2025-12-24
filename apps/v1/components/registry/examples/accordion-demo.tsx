import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"
import { useTranslations } from "next-intl"

export default function AccordionDemo() {
  const t = useTranslations("components.accordion.accordionDemo")
  return (
    <Accordion type="multiple" className="w-full max-w-2xl" defaultValue={["tech-1"]}>
      <AccordionItem value="tech-1">
        <AccordionTrigger>{t("title-1")}</AccordionTrigger>
        <AccordionContent>
          {t("content-1")}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tech-2">
        <AccordionTrigger>{t("title-2")}</AccordionTrigger>
        <AccordionContent>
          {t("content-2")}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tech-3">
        <AccordionTrigger>{t("title-3")}</AccordionTrigger>
        <AccordionContent>
          {t("content-3")}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}