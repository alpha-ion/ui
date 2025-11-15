import { Button } from "@/registry/ui/button"
import { Loading } from "@/registry/ui/loading"

export default function LoadingButtonDemo() {
    return (
        <div className="flex items-center gap-6">
            <Button variant="default" icon={<Loading className="size-4" />}>
                Loading...
            </Button>
        </div>
    )
}
