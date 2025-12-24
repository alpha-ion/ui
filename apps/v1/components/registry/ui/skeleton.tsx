import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-muted/60",
        subtle: "bg-muted/40",
        prominent: "bg-muted/80",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      rounded: "xl",
    },
  }
)

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof skeletonVariants> {
  /**
   * Animation speed in seconds
   * @default 1.25
   */
  speed?: number
}

function Skeleton({
  className,
  variant,
  rounded,
  speed = 1.25,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, rounded }), className)}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-2/3 rotate-6 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/30 blur-[2px] opacity-80"
        initial={{ x: "-160%" }}
        animate={{ x: ["-160%", "160%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}


const SkeletonText = ({
  className,
  lines = 3,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { lines?: number }) => (
  <div className={cn("space-y-2", className)} {...props}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={cn(
          "h-4",
          i === lines - 1 ? "w-4/5" : "w-full"
        )}
      />
    ))}
  </div>
)

const SkeletonAvatar = ({
  className,
  size = "md",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl"
}) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  return (
    <Skeleton
      rounded="full"
      className={cn(sizes[size], className)}
      {...props}
    />
  )
}

const SkeletonCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-4 p-4 border rounded-xl", className)} {...props}>
    <div className="flex items-center space-x-4">
      <SkeletonAvatar />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
)

const SkeletonButton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <Skeleton
    rounded="lg"
    className={cn("h-10 w-24", className)}
    {...props}
  />
)

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonButton
}