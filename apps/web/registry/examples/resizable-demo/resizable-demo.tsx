import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/registry/ui/resizable"

export default function ResizableDemo() {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-2xl border border-border/60 bg-background shadow-sm md:min-w-[450px]"
        >
            <ResizablePanel defaultSize={50}>
                <div className="flex h-[200px] items-center justify-center p-6">
                    <span className="font-semibold text-foreground">One</span>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold text-foreground">Two</span>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold text-foreground">Three</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
