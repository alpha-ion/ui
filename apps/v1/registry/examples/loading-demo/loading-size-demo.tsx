import { Loading } from "@/registry/ui/loading"

export default function LoadingSizeDemo() {
    return (
        <div className="flex items-center gap-6">
            <Loading className="size-3" />
            <Loading className="size-4" />
            <Loading className="size-6" />
            <Loading className="size-8" />
        </div>
    )
}
