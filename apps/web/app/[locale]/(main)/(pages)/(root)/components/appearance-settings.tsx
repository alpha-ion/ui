"use client"
import { Switch } from "@/components/switch-animation"
import { Button } from "@/registry/ui/button"
import { ButtonGroup } from "@/registry/ui/button-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/ui/radio-group"
// import { Switch } from "@/registry/ui/switch"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import * as React from "react"

export function AppearanceSettings() {
  const [gpuCount, setGpuCount] = React.useState(8)

  const handleGpuAdjustment = React.useCallback((adjustment: number) => {
    setGpuCount((prevCount) =>
      Math.max(1, Math.min(99, prevCount + adjustment))
    )
  }, [])

  const handleGpuInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10)
      if (!isNaN(value) && value >= 1 && value <= 99) {
        setGpuCount(value)
      }
    },
    []
  )

  return (
    <FieldSet>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Account Settings</FieldLegend>
          <FieldDescription>
            Manage your account preferences and notifications.
          </FieldDescription>
          <RadioGroup defaultValue="email">
            <FieldLabel htmlFor="email-r2h">
              <Field className="p-3" orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Email Notifications</FieldTitle>
                  <FieldDescription>
                    Receive updates and important information via email. This is the
                    recommended option.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem
                  value="email"
                  id="email-r2h"
                  aria-label="Email Notifications"
                />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="sms-z4k">
              <Field className="p-3" orientation="horizontal">
                <FieldContent>
                  <FieldTitle>SMS Notifications</FieldTitle>
                  <FieldDescription>
                    Get instant updates via text message. (Additional charges may apply)
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem
                  value="sms"
                  id="sms-z4k"
                  aria-label="SMS Notifications"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="number-of-gpus-f6l">Daily Notifications</FieldLabel>
            <FieldDescription>Set how many notifications you want to receive per day.</FieldDescription>
          </FieldContent>
          <ButtonGroup>
            <Input
              id="number-of-gpus-f6l"
              value={gpuCount}
              onChange={handleGpuInputChange}
              className="h-9 !w-14 font-mono"
              maxLength={3}
            />
            <Button
              variant="outline"
              size="sm"
              type="button"
              aria-label="Decrement"
              onClick={() => handleGpuAdjustment(-1)}
              disabled={gpuCount <= 1}
            >
              <IconMinus />
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              aria-label="Increment"
              onClick={() => handleGpuAdjustment(1)}
              disabled={gpuCount >= 99}
            >
              <IconPlus />
            </Button>
          </ButtonGroup>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="tinting">Marketing Emails</FieldLabel>
            <FieldDescription>
              Receive promotional offers and product updates.
            </FieldDescription>
          </FieldContent>
          <Switch id="tinting" size="sm" defaultChecked />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
