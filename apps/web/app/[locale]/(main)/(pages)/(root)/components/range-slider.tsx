"use client"

import { Field, FieldDescription, FieldTitle } from "@/registry/ui/field"
import { Slider } from "@/registry/ui/slider"
import type React from "react"
import { useState } from "react"

export function RangSlider(): React.ReactElement {
  const [value, setValue] = useState<number[]>([20, 80])

  const handleValueChange = (newValue: number[]): void => {
    setValue(newValue)
  }

  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldTitle>Performance Settings</FieldTitle>
        <FieldDescription>
          Adjust your system performance (<span className="font-semibold text-foreground">{value[0]}%</span>
          {" - "}
          <span className="font-semibold text-foreground">{value[1]}%</span>)
        </FieldDescription>
        <div className="mt-6 space-y-4">
          <Slider
            value={value}
            onValueChange={handleValueChange}
            max={100}
            min={0}
            step={1}
            className="w-full"
            aria-label="Performance Range"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{value[0]}%</span>
            <span>{value[1]}%</span>
          </div>
        </div>
      </Field>
    </div>
  )
}
