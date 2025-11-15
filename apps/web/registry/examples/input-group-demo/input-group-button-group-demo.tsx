import {
    ButtonGroup,
    ButtonGroupText,
} from "@/registry/ui/button-group"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/registry/ui/input-group"
import { Label } from "@/registry/ui/label"
import { Link2Icon } from "lucide-react"

export default function InputGroupButtonGroupDemo() {
    return (
        <div className="grid w-full max-w-sm gap-6">
            <ButtonGroup>
                <ButtonGroupText asChild>
                    <Label htmlFor="url">https://</Label>
                </ButtonGroupText>
                <InputGroup>
                    <InputGroupInput id="url" />
                    <InputGroupAddon align="inline-end">
                        <Link2Icon />
                    </InputGroupAddon>
                </InputGroup>
                <ButtonGroupText>.com</ButtonGroupText>
            </ButtonGroup>
        </div>
    )
}
