"use client"

import * as React from "react"
import { ArrowRightIcon, RefreshCcwIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"
import { Input } from "@/registry/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/registry/ui/select"

const UNITS = [
    { value: "km", label: "Kilometers" },
    { value: "mi", label: "Miles" },
]

export function ButtonGroupSelect() {
    const [unit, setUnit] = React.useState<"km" | "mi">("km")
    const [amount, setAmount] = React.useState("")

    const parsed = Number(amount)
    const valid = amount === "" || (!Number.isNaN(parsed) && parsed >= 0)
    const converted = React.useMemo(() => {
        if (Number.isNaN(parsed) || amount === "") return ""
        return unit === "km"
            ? (parsed * 0.621371).toFixed(2) + " mi"
            : (parsed / 0.621371).toFixed(2) + " km"
    }, [amount, parsed, unit])

    return (
        <ButtonGroup>
            <ButtonGroup>
                <Select value={unit} onValueChange={(v) => setUnit(v as "km" | "mi")}>
                    <SelectTrigger className="w-28">
                        {unit === "km" ? "Kilometers" : "Miles"}
                    </SelectTrigger>
                    <SelectContent className="min-w-36">
                        {UNITS.map((u) => (
                            <SelectItem key={u.value} value={u.value}>
                                {u.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input
                    inputMode="decimal"
                    placeholder={unit === "km" ? "Distance in km" : "Distance in mi"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    aria-invalid={!valid}
                    className={!valid ? "border-destructive" : undefined}
                />
            </ButtonGroup>
            <ButtonGroup>
                <Button aria-label="Convert" size="icon" variant="outline" disabled={!valid || amount === ""}>
                    <ArrowRightIcon />
                </Button>
                <Button aria-label="Swap units" size="icon" variant="outline" onClick={() => setUnit(unit === "km" ? "mi" : "km")}>
                    <RefreshCcwIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="ghost" disabled className="pointer-events-none">
                    {converted || "—"}
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    )
}

export default ButtonGroupSelect