'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { LoadingIcon } from '../icons/loading-icon'

interface LanguageSwitcherProps {
    currentLocale: string
}

const languages = [
    {
        code: 'ar',
        name: 'العربية',
        flag: '🇪🇬',
        dir: 'rtl'
    },
    {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
        dir: 'ltr'
    }
]

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

    const handleLanguageChange = (newLocale: string) => {
        if (newLocale === currentLocale) return

        startTransition(() => {
            const segments = pathname.split('/').filter(Boolean)
            if (segments[0] === currentLocale) {
                segments.shift()
            }

            const newPath = `/${newLocale}/${segments.join('/')}`
            router.push(newPath)
            const newDirection = languages.find(lang => lang.code === newLocale)?.dir || 'ltr'
            document.documentElement.dir = newDirection
            document.documentElement.lang = newLocale
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="default"
                    className="h-8 w-8"
                    disabled={isPending}
                >
                    {isPending ? (
                        <LoadingIcon size={12} />
                    ) : (
                        <Globe size={20} />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 p-1" sideOffset={8}>
                {languages.map((language) => {
                    const isActive = currentLocale === language.code
                    return (
                        <DropdownMenuItem
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`
                                cursor-pointer rounded-md px-3 py-2 transition-all duration-200
                                flex items-center justify-between
                                ${isActive
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'hover:bg-accent'
                                }
                            `}
                            disabled={isActive || isPending}
                        >
                            <span className="text-sm">{language.name}</span>
                            <span className="text-base ml-2">{language.flag}</span>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}