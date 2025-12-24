import { Label } from "@/registry/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/registry/ui/radio-group"

export default function RadioGroupDemo() {
    return (
        <RadioGroup defaultValue="comfortable">
            <div className="flex items-center gap-3">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">
                    Default
                </Label>
            </div>
            <div className="flex items-center gap-3">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">
                    Comfortable
                </Label>
            </div>
            <div className="flex items-center gap-3">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer">
                    Compact
                </Label>
            </div>
        </RadioGroup>
    )
}
