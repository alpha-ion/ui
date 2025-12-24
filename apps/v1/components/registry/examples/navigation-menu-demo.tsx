"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import { useTranslations } from 'next-intl'
import Link from "next/link"
import * as React from "react"

export default function NavigationMenuDemo() {
    const isMobile = useIsMobile()
    const t = useTranslations('components.navigationMenuDemo')

    const components = [
        {
            title: t('components.alertDialog.title'),
            href: "/docs/primitives/alert-dialog",
            description: t('components.alertDialog.description'),
        },
        {
            title: t('components.hoverCard.title'),
            href: "/docs/primitives/hover-card",
            description: t('components.hoverCard.description'),
        },
        {
            title: t('components.progress.title'),
            href: "/docs/primitives/progress",
            description: t('components.progress.description'),
        },
        {
            title: t('components.scrollArea.title'),
            href: "/docs/primitives/scroll-area",
            description: t('components.scrollArea.description'),
        },
        {
            title: t('components.tabs.title'),
            href: "/docs/primitives/tabs",
            description: t('components.tabs.description'),
        },
        {
            title: t('components.tooltip.title'),
            href: "/docs/primitives/tooltip",
            description: t('components.tooltip.description'),
        },
    ]

    return (
        <div className="flex">
            <NavigationMenu viewport={isMobile}>
                <NavigationMenuList className="flex-wrap">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>{t('menu.home')}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] z-50">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                                            href="/"
                                        >
                                            <div className="mb-2 text-lg font-medium sm:mt-4">
                                                {t('home.brandTitle')}
                                            </div>
                                            <p className="text-muted-foreground text-sm leading-tight">
                                                {t('home.brandDescription')}
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs" title={t('home.introduction.title')}>
                                    {t('home.introduction.description')}
                                </ListItem>
                                <ListItem href="/docs/installation" title={t('home.installation.title')}>
                                    {t('home.installation.description')}
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title={t('home.typography.title')}>
                                    {t('home.typography.description')}
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>{t('menu.components')}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/docs">{t('menu.docs')}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:block">
                        <NavigationMenuTrigger>{t('menu.list')}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[300px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">{t('list.components.title')}</div>
                                            <div className="text-muted-foreground">
                                                {t('list.components.description')}
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">{t('list.documentation.title')}</div>
                                            <div className="text-muted-foreground">
                                                {t('list.documentation.description')}
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">
                                            <div className="font-medium">{t('list.blog.title')}</div>
                                            <div className="text-muted-foreground">
                                                {t('list.blog.description')}
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:block">
                        <NavigationMenuTrigger>{t('menu.simple')}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">{t('simple.components')}</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">{t('simple.documentation')}</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">{t('simple.blocks')}</Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hidden md:block">
                        <NavigationMenuTrigger>{t('menu.withIcon')}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="#" className="flex-row items-center gap-2">
                                            <CircleHelpIcon />
                                            {t('withIcon.backlog')}
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#" className="flex-row items-center gap-2">
                                            <CircleIcon />
                                            {t('withIcon.todo')}
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="#" className="flex-row items-center gap-2">
                                            <CircleCheckIcon />
                                            {t('withIcon.done')}
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}