import { Kbd, KbdGroup } from "@/registry/ui/kbd"

export default function KbdGroupDemo() {
    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-sm text-center">
                Use{" "}
                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <span className="text-muted-foreground">+</span>
                    <Kbd>B</Kbd>
                </KbdGroup>{" "}
                or{" "}
                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <span className="text-muted-foreground">+</span>
                    <Kbd>K</Kbd>
                </KbdGroup>{" "}
                to open the command palette
            </p>
        </div>
    )
}
