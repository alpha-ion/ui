import { cn } from "@/lib/utils"
import { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonText } from "@/registry/ui/skeleton"
import { useState } from "react"

export default function SkeletonDemo() {
    const [isRTL, setIsRTL] = useState(false)
    const [showLoading, setShowLoading] = useState(true)

    return (
        <div className={cn("min-h-screen bg-background w-full", isRTL && "rtl")} dir={isRTL ? "rtl" : "ltr"}>
            <div className="max-w-7xl mx-auto space-y-8">
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
                <section className="space-y-4">
                    <div className="space-y-4 bg-card rounded-xl border border-border p-6 shadow-lg">
                        {showLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex gap-4 rtl:gap-x-reverse">
                                    <SkeletonAvatar size="md" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <SkeletonText lines={2} />
                                        <div className="flex gap-2 rtl:gap-x-reverse">
                                            <Skeleton className="h-8 w-16" rounded="md" />
                                            <Skeleton className="h-8 w-16" rounded="md" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex gap-4 pb-4 border-b border-border last:border-b-0">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold">
                                        {isRTL ? "م" : "U"}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h4 className="font-semibold text-card-foreground">
                                            {isRTL ? `مستخدم ${i + 1}` : `User ${i + 1}`}
                                        </h4>
                                        <p className="text-card-foreground">
                                            {isRTL
                                                ? "تعليق رائع! أعجبني المحتوى كثيراً وأتطلع لرؤية المزيد من هذا النوع."
                                                : "Great comment! I really enjoyed the content and looking forward to seeing more of this type."}
                                        </p>
                                        <div className="flex gap-3 text-sm text-muted-foreground">
                                            <button className="hover:text-primary transition-colors">
                                                {isRTL ? "إعجاب" : "Like"}
                                            </button>
                                            <button className="hover:text-primary transition-colors">
                                                {isRTL ? "رد" : "Reply"}
                                            </button>
                                            <span>{isRTL ? "منذ 5 دقائق" : "5 min ago"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}