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

export default function NestedDrawerDemo() {
  const t = useTranslations('components.drawer');

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {t('triggerNestedBtn')}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="max-w-sm w-full mx-auto">
          <DrawerHeader>
            <DrawerTitle>
              {t('level1Title')}
            </DrawerTitle>
            <DrawerDescription>
              {t('level1Description')}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-center p-4">
            <Drawer>
              <DrawerTrigger asChild>
                <Button>
                  {t('triggerLevel2Btn')}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="max-w-sm w-full mx-auto">
                  <DrawerHeader>
                    <DrawerTitle>
                      {t('level2Title')}
                    </DrawerTitle>
                    <DrawerDescription>
                      {t('level2Description')}
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <p>
                      {t('level2BodyText')}
                    </p>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">
                        {t('closeButton')}
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">
                {t('closeButton')}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}