import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/registry/ui/resizable"
import { useTranslations } from "next-intl"

export default function ResizableVerticalDemo() {
    const t = useTranslations("components.resizableVerticalDemo")
    return (
        <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] max-w-md rounded-2xl border border-border/60 bg-background shadow-sm md:min-w-[450px]"
        >
            <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold text-foreground">{t("header")}</span>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold text-foreground">{t("content")}</span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
