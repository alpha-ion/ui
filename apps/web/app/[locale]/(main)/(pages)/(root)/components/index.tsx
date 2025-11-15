

import { FieldSeparator } from "@/registry/ui/field"
import { AppearanceSettings } from "./appearance-settings"
import { ButtonGroupDemo } from "./button-group-demo"
import { ButtonGroupInputGroup } from "./button-group-input-group"
import { ButtonGroupNested } from "./button-group-nested"
import { ButtonGroupPopover } from "./button-group-popover"
import { EmptyAvatarGroup } from "./empty-avatar-group"
import { EmptyInputGroup } from "./empty-input-group"
import { FieldCheckbox } from "./field-checkbox"
import { FieldChoiceCard } from "./field-choice-card"
import { FieldDemo } from "./field-demo"
import { FieldHear } from "./field-hear"
import { InputGroupButtonExample } from "./input-group-button"
import { InputGroupDemo } from "./input-group-demo"
import { InputGroupTextareaExample } from "./input-group-textarea"
import { ItemDemo } from "./item-demo"
import { LoadingBadge } from "./loading-badge"
import { LoadingEmpty } from "./loading-empty"
import { NotionPromptForm } from "./notion-prompt-form"
import { RangSlider } from "./range-slider"


export function RootComponents() {
  return (
    <div className="theme-container mx-auto grid gap-8 py-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
      <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <FieldDemo />
        <FieldChoiceCard />
      </div>
      <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <EmptyAvatarGroup />
        <LoadingBadge />
        <ButtonGroupInputGroup />
        <RangSlider />
        <InputGroupDemo />
        <InputGroupTextareaExample />
      </div>
      <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <InputGroupButtonExample />
        <ItemDemo />
        <LoadingEmpty />
        <FieldSeparator className="my-4">Appearance Settings</FieldSeparator>
        <AppearanceSettings />
      </div>
      <div className="order-first flex flex-col gap-6 lg:hidden xl:order-last xl:flex *:[div]:w-full *:[div]:max-w-full">
        <NotionPromptForm />
        <ButtonGroupDemo />
        <FieldCheckbox />
        <div className="flex justify-between gap-4 lg:flex-col">
          <ButtonGroupNested />
          <ButtonGroupPopover />
        </div>
        <FieldHear />
        <EmptyInputGroup />
      </div>
    </div>
  )
}
