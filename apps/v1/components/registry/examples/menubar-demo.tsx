import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/registry/ui/menubar";
import { useTranslations } from 'next-intl';

export default function MenubarDemo() {
    const t = useTranslations('components.menubarDemo');

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>{t('fileTrigger')}</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        {t('newTab')} <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        {t('newWindow')} <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled>{t('newIncognitoWindow')}</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>{t('shareSubTrigger')}</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>{t('emailLink')}</MenubarItem>
                            <MenubarItem>{t('messages')}</MenubarItem>
                            <MenubarItem>{t('notes')}</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        {t('print')} <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>{t('editTrigger')}</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        {t('undo')} <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        {t('redo')} <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>{t('findSubTrigger')}</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>{t('searchWeb')}</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>{t('findEllipsis')}</MenubarItem>
                            <MenubarItem>{t('findNext')}</MenubarItem>
                            <MenubarItem>{t('findPrevious')}</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>{t('cut')}</MenubarItem>
                    <MenubarItem>{t('copy')}</MenubarItem>
                    <MenubarItem>{t('paste')}</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>{t('viewTrigger')}</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem>{t('showBookmarksBar')}</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                        {t('showFullURLs')}
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem inset>
                        {t('reload')} <MenubarShortcut>⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled inset>
                        {t('forceReload')} <MenubarShortcut>⇧⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>{t('toggleFullscreen')}</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>{t('hideSidebar')}</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>{t('profilesTrigger')}</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup value="benoit">
                        <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                        <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                        <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                    <MenubarItem inset>{t('editProfileEllipsis')}</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>{t('addProfileEllipsis')}</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}