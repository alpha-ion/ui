import { Skeleton } from "@/registry/ui/skeleton"

export default function SkeletonDemo() {
    return (
        <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[240px] rounded-lg" />
                <Skeleton className="h-4 w-[180px] rounded-lg" />
            </div>
        </div>
    )
}
