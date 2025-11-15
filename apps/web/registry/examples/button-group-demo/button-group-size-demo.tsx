import { PlusIcon, CheckIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"

export function ButtonGroupSize() {
    return (
        <div className="flex flex-col items-start gap-8">
            <ButtonGroup>
                <Button variant="outline" size="sm">Tiny</Button>
                <Button variant="secondary" size="sm">Label</Button>
                <Button variant="secondary" size="sm" disabled>
                    Disabled
                </Button>
                <Button variant="outline" size="sm" aria-label="Add">
                    <PlusIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="default">Default</Button>
                <Button variant="outline">Primary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline" size="icon" aria-label="Confirm">
                    <CheckIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="outline" size="lg">Large</Button>
                <Button variant="secondary" size="lg">Action</Button>
                <Button variant="secondary" size="lg">Review</Button>
                <Button variant="outline" size="lg" aria-label="Add large">
                    <PlusIcon />
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default ButtonGroupSize