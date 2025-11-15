import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/registry/ui/empty"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/registry/ui/input-group"
import { Kbd } from "@/registry/ui/kbd"
import { SearchIcon } from "lucide-react"

export default function EmptyDemo() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle>No Products Found</EmptyTitle>
                <EmptyDescription>
                    No products match your search criteria. Try searching for
                    what you need below.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <InputGroup className="w-3/4">
                    <InputGroupInput placeholder="Search for products, brands, or categories..." />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <Kbd>/</Kbd>
                    </InputGroupAddon>
                </InputGroup>
                <EmptyDescription>
                    Need help? <a href="#">Contact Support</a>
                </EmptyDescription>
            </EmptyContent>
        </Empty>
    )
}
