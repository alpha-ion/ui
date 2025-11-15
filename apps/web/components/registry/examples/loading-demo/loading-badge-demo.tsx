import { Badge } from "@/registry/ui/badge"
import { Loading } from "@/registry/ui/loading"

export default function LoadingBadgeDemo() {
    return (
        <div className="flex items-center gap-6">
            <Badge variant="default" icon={<Loading className="size-4" />}>
                Loading...
            </Badge>
        </div>
    )
}
