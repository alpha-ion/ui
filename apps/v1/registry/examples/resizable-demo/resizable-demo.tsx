import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/registry/ui/resizable"
import { useTranslations } from "next-intl"

export default function ResizableDemo() {
    const t = useTranslations("components.resizableDemo")
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-2xl border border-border/60 bg-background shadow-sm md:min-w-[450px]"
        >
            <ResizablePanel defaultSize={50}>
                <div className="flex h-[200px] items-center justify-center p-6">
                    <span className="font-semibold text-foreground">{t("panelOne")}</span>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold text-foreground">{t("panelTwo")}</span>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold text-foreground">{t("panelThree")}</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
