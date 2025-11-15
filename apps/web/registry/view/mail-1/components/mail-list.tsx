import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/registry/ui/drawer"
import { ScrollArea } from "@/registry/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import React, { ComponentProps } from "react"
import { Mail } from "../data"
import { useMail } from "../use-mail"
import { MailDisplay } from "./mail-display"
interface MailListProps {
  items: Mail[]
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail()
  const [open, setOpen] = React.useState(false)
  const selectedItem = items.find((item) => item.id === mail.selected)

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent cursor-pointer w-full",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() => {
              setMail({
                ...mail,
                selected: item.id,
              })
              setOpen(true)
            }}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[90%]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Email Details</DrawerTitle>
            <DrawerDescription>View email details</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-hidden">
            {selectedItem && <MailDisplay mail={selectedItem} />}
          </div>
        </DrawerContent>
      </Drawer>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default"
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline"
  }

  return "secondary"
}
