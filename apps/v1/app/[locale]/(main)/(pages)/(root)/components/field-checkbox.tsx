import { Checkbox } from "@/registry/ui/checkbox"
import { Field, FieldLabel } from "@/registry/ui/field"

export function FieldCheckbox() {
  return (
    <FieldLabel htmlFor="checkbox-demo">
      <Field className="p-2" orientation="horizontal">
        <Checkbox id="checkbox-demo" defaultChecked />
        <FieldLabel htmlFor="checkbox-demo" className="line-clamp-1">
          Enable AI-powered code suggestions and auto-completion
        </FieldLabel>
      </Field>
    </FieldLabel>
  )
}
