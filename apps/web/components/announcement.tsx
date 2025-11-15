import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export function Announcement() {
  return (
    <Badge variant="secondary" className="rounded-full flex space-x-3">
      <Link href="/docs/changelog" className="flex items-center justify-center p-0.5 gap-2">
        <span className="flex size-2 rounded-full bg-blue-500" title="New" />
        <span className=" text-[10px] md:text-xs">
          New Components: Note, Input Group, List Item and more
        </span>
        <ArrowRightIcon className="w-3.5 h-3.5" />
      </Link>
    </Badge>
  )
}
