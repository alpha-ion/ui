import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/registry/ui/input-group"
import { Loading } from "@/registry/ui/loading"
import { LoaderIcon } from "lucide-react"

export default function InputGroupLoading() {
    return (
        <div className="grid w-full max-w-sm gap-4">
            <InputGroup data-disabled>
                <InputGroupInput placeholder="Searching..." disabled />
                <InputGroupAddon align="inline-end">
                    <Loading />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup data-disabled>
                <InputGroupInput placeholder="Processing..." disabled />
                <InputGroupAddon>
                    <Loading />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup data-disabled>
                <InputGroupInput placeholder="Saving changes..." disabled />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>Saving...</InputGroupText>
                    <Loading />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup data-disabled>
                <InputGroupInput placeholder="Refreshing data..." disabled />
                <InputGroupAddon>
                    <LoaderIcon className="animate-spin" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <InputGroupText className="text-muted-foreground">
                        Please wait...
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}
