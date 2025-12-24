<ComponentPreview name="collapsible-demo" />

## التثبيت

<CliCodeTabs>
  <TabsContent value="cli">
    <CliCodeTabs>
      <CodeCommands componentName="collapsible" />
    </CliCodeTabs>
  </TabsContent>

  <TabsContent value="manual">
    <div className="not-prose px-4 md:px-0">
      <Step>
        <StepItem title="تثبيت الاعتمادات (Dependencies)">
          أولاً، تحتاج إلى تثبيت الاعتمادات:

          <Pre className="language-bash">
            {`npm install clsx tailwind-merge @radix-ui/react-collapsible `}
          </Pre>
        </StepItem>

        <StepItem title="إنشاء ملف utils.ts">
          <ComponentUtilsText />

          <ComponentUtils />
        </StepItem>

        <StepItem title="إنشاء مكوّن القابل للطي (Collapsible)">
          <ComponentSource name="collapsible-demo" />
        </StepItem>
      </Step>
    </div>
  </TabsContent>
</CliCodeTabs>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import {
        Collapsible,
        CollapsibleContent,
        CollapsibleTrigger,
      } from "@/components/ui/collapsible"`}
  </Pre>

  <Pre>
    {`<Collapsible>
      <CollapsibleTrigger>هل يمكنني استخدام هذا في مشروعي؟</CollapsibleTrigger>
      <CollapsibleContent>
        نعم. مجاني للاستخدام في المشاريع الشخصية والتجارية. لا حاجة للإشارة إلى المصدر.
      </CollapsibleContent>
      </Collapsible>`}
  </Pre>
</div>
