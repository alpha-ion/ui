"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/registry/ui/card"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { useTranslations } from "next-intl"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FiEye, FiEyeOff } from "react-icons/fi"

export default function CardDemo({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const t = useTranslations('components.card');
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const ariaLabelText = showPassword ? t('hidePassword') : t('showPassword');


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{t('title')}</CardTitle>
                    <CardDescription>
                        {t('description')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">{t('emailLabel')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t('emailPlaceholder')}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">{t('passwordLabel')}</Label>
                                    <Link
                                        href="#"
                                        className="ms-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        {t('forgotPassword')}
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute inset-y-0 end-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={togglePasswordVisibility}
                                        aria-label={ariaLabelText}
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <FiEye className="h-4 w-4 text-gray-500" />
                                        )}
                                        <span className="sr-only">{ariaLabelText}</span>
                                    </Button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                {t('loginButton')}
                            </Button>
                            <Button variant="outline" className="w-full">
                                <FcGoogle className="inline-block text-lg me-2" />
                                {t('loginWithGoogle')}
                            </Button>
                        </div>
                        <div
                            className="mt-4 text-center text-sm rtl:text-start"
                        >
                            {t('noAccount')}{" "}
                            <Link
                                href="/view/signup-1"
                                className="underline underline-offset-4"
                            >
                                {t('signUpLink')}
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}