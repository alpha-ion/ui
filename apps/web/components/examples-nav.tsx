"use client"

import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/registry/ui/scroll-area"
import { usePathname } from "next/navigation"

const examples = [
  {
    name: "Dashboard",
    href: "/examples/dashboard",
    code: "",
    hidden: false,
  },
  {
    name: "Tasks",
    href: "/examples/tasks",
    code: "",
    hidden: false,
  },
  {
    name: "Mail",
    href: "/examples/mail",
    code: "",
    hidden: false,
  },
  {
    name: "Playground",
    href: "/examples/playground",
    code: "",
    hidden: false,
  },
  {
    name: "Authentication",
    href: "/examples/authentication",
    code: "",
    hidden: false,
  },
]

export function ExamplesNav({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const pathname = usePathname()

  return (
    <div className={cn("flex items-center", className)} {...props}>
      <ScrollArea className="max-w-[96%] md:max-w-[600px] lg:max-w-none">
        <div className="flex items-center">
          <ExampleLink
            example={{ name: "Examples", href: "/", code: "", hidden: false }}
            isActive={pathname === "/"}
          />
          {examples.map((example) => (
            <ExampleLink
              key={example.href}
              example={example}
              isActive={pathname?.startsWith(example.href) ?? false}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}

function ExampleLink({
  example,
  isActive,
}: {
  example: (typeof examples)[number]
  isActive: boolean
}) {
  if (example.hidden) {
    return null
  }

  return (
    <Link
      href={example.href}
      key={example.href}
      className="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium transition-colors"
      data-active={isActive}
    >
      {example.name}
    </Link>
  )
}
