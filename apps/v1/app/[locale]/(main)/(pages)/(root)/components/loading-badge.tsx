import { Badge } from "@/registry/ui/badge"
import { Loading } from "@/registry/ui/loading"

export function LoadingBadge() {
  return (
    <div className="flex items-center gap-2">
      <Badge>
        <Loading />
        Building
      </Badge>
      <Badge variant="secondary">
        <Loading />
        Deploying
      </Badge>
      <Badge variant="outline">
        <Loading />
        Processing
      </Badge>
    </div>
  )
}
