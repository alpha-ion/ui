import { Kbd, KbdGroup } from "@/registry/ui/kbd"

export default function KbdDemo() {
    return (
        <div className="flex flex-col items-center gap-6">
            <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>⌥</Kbd>
                <Kbd>⌃</Kbd>
            </KbdGroup>
            <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <span className="text-muted-foreground">+</span>
                <Kbd>B</Kbd>
            </KbdGroup>
        </div>
    )
}
