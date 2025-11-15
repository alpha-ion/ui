import {
    ListItem,
    ListItemContent,
    ListItemMedia,
    ListItemTitle,
} from "@/registry/ui/list-item"
import { Loading } from "@/registry/ui/loading"

export default function LoadingDemo() {
    return (
        <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
            <ListItem variant="outline">
                <ListItemMedia>
                    <Loading />
                </ListItemMedia>
                <ListItemContent>
                    <ListItemTitle className="line-clamp-1">Processing payment...</ListItemTitle>
                </ListItemContent>
                <ListItemContent className="flex-none justify-end">
                    <span className="text-sm tabular-nums">$100.00</span>
                </ListItemContent>
            </ListItem>
        </div>
    )
}
