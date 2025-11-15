import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RotateCcw } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import { CodeViewer } from "./components/code-viewer"
import { MaxLengthSelector } from "./components/maxlength-selector"
import { ModelSelector } from "./components/model-selector"
import { PresetActions } from "./components/preset-actions"
import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"
import { TemperatureSelector } from "./components/temperature-selector"
import { TopPSelector } from "./components/top-p-selector"
import { models, types } from "./data/models"
import { presets } from "./data/presets"

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
}

export default function PlaygroundPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/playground-light.png"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/playground-dark.png"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-1 flex-col md:flex">
        <div className="container flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center sm:gap-0 md:py-8">
          <h1 className="text-2xl font-bold tracking-tight">Playground</h1>
          <div className="ml-auto flex w-full gap-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <div className="hidden gap-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
            <PresetActions />
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex flex-1 flex-col">
          <div className="container flex flex-1 flex-col py-6">
            <div className="grid flex-1 items-stretch gap-8 md:grid-cols-[1fr_240px]">
              <div className="hidden flex-col gap-6 sm:flex md:order-2">
                <div className="space-y-4 rounded-lg border bg-card p-4">
                  <div className="grid gap-3">
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <span className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Mode
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-[320px] text-sm" side="left">
                        Choose the interface that best suits your task. You can provide: a simple prompt to complete,
                        starting and ending text to insert a completion within, or some text with instructions to edit
                        it.
                      </HoverCardContent>
                    </HoverCard>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="complete" className="flex items-center justify-center">
                        <span className="sr-only">Complete</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                          <rect x="4" y="3" width="12" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="4" y="7" width="12" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="4" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="4" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="8.5" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="8.5" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="13" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                        </svg>
                      </TabsTrigger>
                      <TabsTrigger value="insert" className="flex items-center justify-center">
                        <span className="sr-only">Insert</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                            fill="currentColor"
                          ></path>
                          <rect x="4" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="8.5" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="13" y="15" width="3" height="2" rx="1" fill="currentColor"></rect>
                        </svg>
                      </TabsTrigger>
                      <TabsTrigger value="edit" className="flex items-center justify-center">
                        <span className="sr-only">Edit</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                          <rect x="4" y="3" width="12" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="4" y="7" width="12" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="4" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="4" y="15" width="4" height="2" rx="1" fill="currentColor"></rect>
                          <rect x="8.5" y="11" width="3" height="2" rx="1" fill="currentColor"></rect>
                          <path
                            d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                <div className="space-y-4 rounded-lg border bg-card p-4">
                  <ModelSelector types={types} models={models} />
                  <Separator className="my-2" />
                  <TemperatureSelector defaultValue={[0.56]} />
                  <MaxLengthSelector defaultValue={[256]} />
                  <TopPSelector defaultValue={[0.9]} />
                </div>
              </div>
              <div className="flex flex-1 flex-col *:data-[slot=tab-content]:flex-1 md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col gap-4">
                    <Textarea
                      placeholder="Write a tagline for an ice cream shop"
                      className="min-h-[400px] flex-1 rounded-lg border-2 p-4 md:min-h-[700px] lg:min-h-[700px]"
                    />
                    <div className="flex items-center gap-2">
                      <Button className="px-6">Submit</Button>
                      <Button variant="secondary" size="icon">
                        <span className="sr-only">Show history</span>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="insert" className="mt-0 flex flex-col gap-4 border-0 p-0">
                  <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                    <Textarea
                      placeholder="We're writing to [inset]. Congrats from OpenAI!"
                      className="h-full min-h-[300px] rounded-lg border-2 p-4 lg:min-h-[700px] xl:min-h-[700px]"
                    />
                    <div className="rounded-lg border-2 border-dashed bg-muted/50 p-4 flex items-center justify-center text-muted-foreground">
                      <p className="text-sm">Output will appear here</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="px-6">Submit</Button>
                    <Button variant="secondary" size="icon">
                      <span className="sr-only">Show history</span>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-0 flex flex-col gap-4 border-0 p-0">
                  <div className="grid h-full gap-6 lg:grid-cols-2">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-1 flex-col gap-2">
                        <Label htmlFor="input" className="font-semibold">
                          Input
                        </Label>
                        <Textarea
                          id="input"
                          placeholder="We is going to the market."
                          className="flex-1 rounded-lg border-2 p-4 lg:min-h-[580px]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="instructions" className="font-semibold">
                          Instructions
                        </Label>
                        <Textarea
                          id="instructions"
                          placeholder="Fix the grammar."
                          className="rounded-lg border-2 p-4"
                        />
                      </div>
                    </div>
                    <div className="rounded-lg border-2 border-dashed bg-muted/50 p-4 flex items-center justify-center text-muted-foreground min-h-[400px] lg:min-h-[700px]">
                      <p className="text-sm">Output will appear here</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="px-6">Submit</Button>
                    <Button variant="secondary" size="icon">
                      <span className="sr-only">Show history</span>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}
