import { Loading } from "@/registry/ui/loading"

export default function LoadingColorDemo() {
    return (
        <div className="flex items-center gap-6">
            <Loading className="size-6 text-red-500" />
            <Loading className="size-6 text-green-500" />
            <Loading className="size-6 text-blue-500" />
            <Loading className="size-6 text-yellow-500" />
            <Loading className="size-6 text-purple-500" />
        </div>
    )
}
