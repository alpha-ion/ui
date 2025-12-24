import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/registry/ui/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/ui/radio-group"

export function FieldChoiceCard() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel htmlFor="compute-environment-p8w">
            AI Model Selection
          </FieldLabel>
          <FieldDescription>
            Choose the AI model that best fits your development needs.
          </FieldDescription>
          <RadioGroup defaultValue="gpt">
            <FieldLabel htmlFor="label-field-card-1">
              <Field className="p-3" orientation="horizontal">
                <RadioGroupItem
                  value="gpt"
                  id="label-field-card-1"
                  aria-label="GPT Model"
                />
                <FieldContent>
                  <FieldTitle>GPT-4 Turbo</FieldTitle>
                  <FieldDescription>
                    Advanced AI model for complex coding tasks and debugging.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="label-field-card-2">
              <Field className="p-3" orientation="horizontal">
                <RadioGroupItem
                  value="claude"
                  id="label-field-card-2"
                  aria-label="Claude Model"
                />
                <FieldContent>
                  <FieldTitle>Claude Sonnet</FieldTitle>
                  <FieldDescription>
                    Fast and efficient AI model for quick code generation.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}
