import { cn } from "@/lib/utils"

export function PageNav({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("container-wrapper scroll-mt-24 border-b border-border/50", className)} {...props}>
      <div className="container flex items-center justify-between gap-4 py-2 px-0">
        {children}
      </div>
    </div>
  )
}
