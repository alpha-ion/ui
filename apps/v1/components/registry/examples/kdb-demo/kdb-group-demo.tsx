import { useTranslations } from 'next-intl';
import { Kbd, KbdGroup } from "@/registry/ui/kbd"

export default function KbdGroupDemo() {
    const t = useTranslations('components.kdb.kbdGroup');

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="text-muted-foreground text-sm text-center">
                {t('instructionTextStart')}{" "}
                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <span className="text-muted-foreground">+</span>
                    <Kbd>B</Kbd>
                </KbdGroup>{" "}
                {t('instructionTextOr')}{" "}
                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <span className="text-muted-foreground">+</span>
                    <Kbd>K</Kbd>
                </KbdGroup>{" "}
                {t('instructionTextEnd')}
            </div>
        </div>
    )
}