import { Plus } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import {
  ListItem,
  ListItemActions,
  ListItemContent,
  ListItemDescription,
  ListItemMedia,
  ListItemTitle,
} from "@/registry/ui/list-item"

export function ItemAvatar() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <ListItem variant="outline" className="hidden">
        <ListItemMedia variant="avatar">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/maxleiter.png" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </ListItemMedia>
        <ListItemContent>
          <ListItemTitle>Max Leiter</ListItemTitle>
          <ListItemDescription>Last seen 5 months ago</ListItemDescription>
        </ListItemContent>
        <ListItemActions>
          <Button
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
          >
            <Plus />
          </Button>
        </ListItemActions>
      </ListItem>
      <ListItem variant="outline" >
        <ListItemMedia variant="default">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar className="hidden sm:flex">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="hidden sm:flex">
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </ListItemMedia>
        <ListItemContent>
          <ListItemTitle>No Team Members</ListItemTitle>
          <ListItemDescription>Invite your team to collaborate.</ListItemDescription>
        </ListItemContent>
        <ListItemActions>
          <Button size="sm" variant="outline">
            Invite
          </Button>
        </ListItemActions>
      </ListItem>
    </div>
  )
}
