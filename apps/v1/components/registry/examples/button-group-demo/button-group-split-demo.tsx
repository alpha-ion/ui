import { Button } from "@/registry/ui/button"
import {
    ButtonGroup,
    ButtonGroupSeparator,
} from "@/registry/ui/button-group"
import { IconPlus, IconChevronDown } from "@tabler/icons-react"

export function ButtonGroupSplit() {
    return (
        <ButtonGroup>
            <Button variant="secondary" aria-label="Create item">
                New
            </Button>
            <ButtonGroupSeparator />
            <Button size="icon" variant="secondary" aria-label="Quick add">
                <IconPlus />
            </Button>
            <Button size="icon" variant="secondary" aria-label="More create options">
                <IconChevronDown />
            </Button>
        </ButtonGroup>
    )
}

export default ButtonGroupSplit