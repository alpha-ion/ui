import { Card, CardContent } from "@/registry/ui/card"
import { Checkbox } from "@/registry/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/ui/field"

const options = [
  {
    label: "GitHub",
    value: "github",
  },

  {
    label: "Stack Overflow",
    value: "stack-overflow",
  },
  {
    label: "Developer Community",
    value: "community",
  },
  {
    label: "Tech Blog",
    value: "blog",
  },
]

export function FieldHear() {
  return (
    <Card className="py-4 shadow-none">
      <CardContent className="px-4">
        <form>
          <FieldGroup>
            <FieldSet className="gap-4">
              <FieldLegend>Where did you discover this tool?</FieldLegend>
              <FieldDescription className="line-clamp-1">
                Help us understand how developers find our development tools.
              </FieldDescription>
              <FieldGroup className="flex flex-row flex-wrap gap-2 [--radius:9999rem]">
                {options.map((option) => (
                  <FieldLabel
                    htmlFor={option.value}
                    key={option.value}
                    className="!w-fit"
                  >
                    <Field
                      orientation="horizontal"
                      className="gap-1.5 overflow-hidden !px-3 !py-1.5 transition-all duration-100 ease-linear group-has-data-[state=checked]/field-label:!px-2"
                    >
                      <Checkbox
                        value={option.value}
                        id={option.value}
                        defaultChecked={option.value === "github"}
                        className="-ml-6 -translate-x-1 rounded-full transition-all duration-100 ease-linear data-[state=checked]:ml-0 data-[state=checked]:translate-x-0"
                      />
                      <FieldTitle>{option.label}</FieldTitle>
                    </Field>
                  </FieldLabel>
                ))}
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
