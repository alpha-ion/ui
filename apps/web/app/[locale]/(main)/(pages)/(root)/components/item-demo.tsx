import { Button } from "@/registry/ui/button"
import {
  ListItem,
  ListItemActions,
  ListItemContent,
  ListItemDescription,
  ListItemMedia,
  ListItemTitle,
} from "@/registry/ui/list-item"
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

export function ItemDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 ">
      <ListItem variant="outline" className="rounded-2xl"> 
        <ListItemContent>
          <ListItemTitle>AI Code Assistant</ListItemTitle>
          <ListItemDescription className="text-pretty xl:hidden 2xl:block">
            Get intelligent code suggestions and auto-completion.
          </ListItemDescription>
        </ListItemContent>
        <ListItemActions>
          <Button size="sm">Activate</Button>
        </ListItemActions>
      </ListItem>
      <ListItem variant="outline" size="sm" asChild className="rounded-2xl">
        <a href="#">
          <ListItemMedia variant="icon">
            <BadgeCheckIcon className="size-5" />
          </ListItemMedia>
          <ListItemContent>
            <ListItemTitle>Your development environment is ready.</ListItemTitle>
          </ListItemContent>
          <ListItemActions>
            <ChevronRightIcon className="size-4" />
          </ListItemActions>
        </a>
      </ListItem>
    </div>
  )
}
