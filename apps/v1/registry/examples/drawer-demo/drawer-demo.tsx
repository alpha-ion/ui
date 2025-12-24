"use client"

import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { useTranslations } from "next-intl";

export default function DrawerDemo() {
  const t = useTranslations('components.drawer'); 

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={"outline"}>
            {t('triggerButton')}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex items-center h-full flex-col max-w-lg mx-auto rounded-2xl">
            <DrawerHeader>
              <DrawerTitle>
                {t('title')}
              </DrawerTitle>
              <DrawerDescription>
                {t('description')}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t('nameLabel')}
                  </label>
                  <input
                    id="name"
                    placeholder={t('namePlaceholder')}
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('emailLabel')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="w-full rounded-md border p-2"
                  />
                </div>
              </div>
            </div>
            <DrawerFooter className="flex-row justify-end space-x-2 rtl:justify-start rtl:space-x-reverse">
              <DrawerClose asChild>
                <Button variant="ghost">
                  {t('cancelButton')}
                </Button>
              </DrawerClose>
              <Button>
                {t('saveButton')}
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}