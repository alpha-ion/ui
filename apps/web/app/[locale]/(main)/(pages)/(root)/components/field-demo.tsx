import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"
import { Textarea } from "@/registry/ui/textarea"

export function FieldDemo() {
  return (
    <div className="w-full max-w-md rounded-2xl border p-6">
      <form className="space-y-4">
        <section className="space-y-2">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Project Setup</h2>
            <p className="text-sm text-muted-foreground">Configure your new project with AI assistance</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name" className="text-sm font-medium">
                Project Name
              </Label>
              <Input
                id="project-name"
                placeholder="My Awesome App"
                required
                className="h-11 rounded-lg border-input bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="framework" className="text-sm font-medium">
                  Framework
                </Label>
                <Select defaultValue="">
                  <SelectTrigger id="framework" className="h-11 rounded-lg border-input bg-card">
                    <SelectValue placeholder="Choose framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nextjs">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue.js</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Select your preferred framework</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template" className="text-sm font-medium">
                  Template
                </Label>
                <Select defaultValue="">
                  <SelectTrigger id="template" className="h-11 rounded-lg border-input bg-card">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spa">SPA</SelectItem>
                    <SelectItem value="ssr">SSR</SelectItem>
                    <SelectItem value="static">Static</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium">
                  Language
                </Label>
                <Select defaultValue="">
                  <SelectTrigger id="language" className="h-11 rounded-lg border-input bg-card">
                    <SelectValue placeholder="TypeScript" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="database" className="text-sm font-medium">
                  Database
                </Label>
                <Select defaultValue="">
                  <SelectTrigger id="database" className="h-11 rounded-lg border-input bg-card">
                    <SelectValue placeholder="PostgreSQL" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-4 pt-4 border-t border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2"> Styling Options</h2>
            <p className="text-sm text-muted-foreground">Customize your project's appearance and behavior</p>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="dark-mode" defaultChecked className="rounded" />
            <Label htmlFor="dark-mode" className="text-sm font-normal cursor-pointer">
              Enable dark mode by default
            </Label>
          </div>
        </section>
        <section className="space-y-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Project Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your project goals and features..."
              className="min-h-24 rounded-lg border-input bg-card text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>
        </section>
        <div className="flex gap-3 justify-end pt-4 border-t border-border">
          <Button type="button" variant="outline" className="px-6 h-11 rounded-lg font-medium bg-transparent">
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 h-11 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Project
          </Button>
        </div>
      </form>
    </div>
  )
}
