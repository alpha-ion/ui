<ComponentPreview name="badge-demo" />

## التثبيت

<CliCodeTabs>
  <TabsContent value="أمر الـ CLI">
    <CliCodeTabs>
      <CodeCommands componentName="badge" />
    </CliCodeTabs>
  </TabsContent>

  <TabsContent value="تثبيت يدويا">
    <div className="not-prose px-4 md:px-0">
      <Step>
        <StepItem title="تثبيت الاعتمادات">
          أولاً، تحتاج إلى تثبيت الاعتمادات:

          <Pre className="language-bash">
            {`npm install clsx tailwind-merge `}
          </Pre>
        </StepItem>

        <StepItem title="إنشاء ملف utils.ts">
          <ComponentUtilsText />

          <ComponentUtils />
        </StepItem>

        <StepItem title="إنشاء مكوّن Badge">
          <ComponentSource name="badge-demo" />
        </StepItem>
      </Step>
    </div>
  </TabsContent>
</CliCodeTabs>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import { Badge } from '@/components/ui/badge'`}
  </Pre>

  <Pre>
    {`<Badge variant="outline">Badge</Badge>`}
  </Pre>
</div>

## نصائح

يمكنك استخدام <MdxBadge>badgeVariants</MdxBadge> لإنشاء مكوّن شارة خاص بك بأنماط مختلفة.

<div className="not-prose space-y-6">
  <Pre>
    {`import { Badge } from '@/components/ui/badge'`}
  </Pre>

  <Pre>
    {`<Link className={badgeVariants({ variant: "outline" })}>Badge</Link>`}
  </Pre>
</div>

## أمثلة

### افتراضي

<ComponentPreview name="badge-demo" />

### مخطط (Outline)

<ComponentPreview name="badge-demo" variant="outline" />

### حظر (Destructive)

<ComponentPreview name="badge-demo" variant="destructive" />

### نجاح (Success)

<ComponentPreview name="badge-demo" variant="success" />

### تحذير (Warning)

<ComponentPreview name="badge-demo" variant="warning" />

### معلومة (Info)

<ComponentPreview name="badge-demo" variant="info" />

### قابل للإزالة (Removable)

<ComponentPreview name="badge-demo" variant="removable" />

### مع أيقونة (With icon)

<ComponentPreview name="badge-demo" variant="icon" />
