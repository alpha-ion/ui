import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-xl bg-muted/70", className)}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-2/3 rotate-6 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/30 blur-[2px] opacity-80"
        initial={{ x: "-160%" }}
        animate={{ x: ["-160%", "160%"] }}
        transition={{ duration: 1.25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export { Skeleton }
