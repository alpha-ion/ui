"use client"
import { Skeleton, SkeletonAvatar, SkeletonButton } from "@/registry/ui/skeleton"
import { useState } from "react"

export default function SkeletonCardDemo() {
    const [isRTL, setIsRTL] = useState(false)
    const [showLoading, setShowLoading] = useState(true)
    return (
        <section className="space-y-4 w-full">
            <div className="flex gap-3">
                <button
                    onClick={() => setIsRTL(!isRTL)}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
                >
                    {isRTL ? "التبديل لـ LTR" : "Switch to RTL"}
                </button>
                <button
                    onClick={() => setShowLoading(!showLoading)}
                    className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-colors"
                >
                    {isRTL ? (showLoading ? "إظهار المحتوى" : "إظهار التحميل") : (showLoading ? "Show Content" : "Show Loading")}
                </button>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border shadow-lg">
                {showLoading ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 rtl:gap-x-reverse">
                            <SkeletonAvatar size="xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="flex gap-3 rtl:gap-x-reverse">
                            <SkeletonButton />
                            <SkeletonButton />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                                {isRTL ? "أح" : "JD"}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-card-foreground">
                                    {isRTL ? "أحمد محمد" : "John Doe"}
                                </h3>
                                <p className="text-muted-foreground">
                                    {isRTL ? "مطور واجهات أمامية" : "Frontend Developer"}
                                </p>
                            </div>
                        </div>
                        <p className="text-card-foreground">
                            {isRTL
                                ? "مطور متحمس يحب بناء واجهات مستخدم جميلة وعملية. متخصص في React و TypeScript."
                                : "Passionate developer who loves building beautiful and functional user interfaces. Specialized in React & TypeScript."}
                        </p>
                        <div className="flex gap-3">
                            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                {isRTL ? "متابعة" : "Follow"}
                            </button>
                            <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors">
                                {isRTL ? "رسالة" : "Message"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
