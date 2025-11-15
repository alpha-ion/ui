import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonCardDemo() {
    return (
        <div className="w-[280px] rounded-2xl border border-border/60 bg-background/50 p-4 shadow-sm">
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-32 w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[220px] rounded-lg" />
                    <Skeleton className="h-4 w-[160px] rounded-lg" />
                </div>
            </div>
        </div>
    )
}
